# komşu.site - Rezervasyon Concurrency & Kilitleme Mekanizması

---

## 1. Concurrency (Eşzamanlılık) Problemi Tanımı
Toplu konut ve sitelerde tenis kortu, halı saha, sinema salonu gibi rezervasyonla çalışan sosyal tesislerin sayısı sınırlıdır. Popüler saatlerde (örneğin hafta sonu akşam saatleri) birden fazla sakin aynı tesisin aynı saat dilimi için saniyeler hatta milisaniyeler farkla rezervasyon tuşuna basabilir.

Klasik veri okuma ve yazma işlemlerinde (Read -> Check -> Write) şu senaryo gerçekleşir:
1. **Sakin A** boş saati sorgular (Boş görür).
2. **Sakin B** aynı boş saati sorgular (Boş görür).
3. **Sakin A** kaydı ekler.
4. **Sakin B** de kaydı ekler.
5. **Sonuç:** Çifte Rezervasyon (Double-Booking) hatası oluşur ve sistem güvenilirliğini yitirir.

**komşu.site**, bu çakışmayı veri tabanı katmanında **PostgreSQL Row-Level Locking (Satır Düzeyinde Kilitleme)** ve `SELECT ... FOR UPDATE` mimarisi kullanarak %100 oranında önler.

---

## 2. Eşzamanlı Kilitleme Akış Şeması (Sequence Diagram)

Aşağıdaki sequence diyagramı, iki sakinin aynı tesis slotunu aynı anda rezerve etmeye çalışması durumunda Next.js API katmanı ile PostgreSQL arasındaki işlem sırasını ve kilitleme aşamalarını göstermektedir:

```mermaid
sequenceDiagram
    autonumber
    actor Sakin1 as Sakin 1 (14:00 Slotu)
    actor Sakin2 as Sakin 2 (14:00 Slotu)
    participant API as tRPC / Next.js Server
    participant DB as PostgreSQL Database

    Note over Sakin1,Sakin2: İki sakin aynı milisaniyede "Rezerve Et" butonuna basar.
    
    Sakin1->>API: Rezervasyon Talebi (Tesis: 1, Saat: 14:00 - 15:00)
    Sakin2->>API: Rezervasyon Talebi (Tesis: 1, Saat: 14:00 - 15:00)
    
    Note over API,DB: Veritabanı İşlemleri (Transactions) Başlatılır
    
    API->>DB: [Tx A] BEGIN TRANSACTION;
    API->>DB: [Tx B] BEGIN TRANSACTION;
    
    Note over DB: Tx A, sorguladığı ilgili satırları yazma amaçlı kilitler (FOR UPDATE)
    API->>DB: [Tx A] SELECT * FROM reservations WHERE facility_id = 1 AND (start_time, end_time) OVERLAPS (14:00, 15:00) FOR UPDATE;
    DB-->>API: [Tx A] Sonuç: Boş (Kilit Başarıyla Alındı, Çakışma Yok)
    
    Note over DB: Tx B aynı sorguyu çalıştırır ancak Tx A satırlara kilit koyduğu için BEKLETİLİR!
    API->>DB: [Tx B] SELECT * FROM reservations WHERE facility_id = 1 AND (start_time, end_time) OVERLAPS (14:00, 15:00) FOR UPDATE;
    Note over DB: [Tx B] Beklemede (Row Lock Blocked by Tx A)
    
    Note over API,DB: Tx A rezervasyon kaydını yazar ve işlemi bitirir.
    API->>DB: [Tx A] INSERT INTO reservations (membership_id, facility_id, start_time, end_time, status) VALUES ('mem-1', 1, 14:00, 15:00, 'approved');
    DB-->>API: [Tx A] Kayıt Başarılı
    API->>DB: [Tx A] COMMIT;
    Note over DB: Tx A bitti. Satır kilidi serbest bırakılır.
    
    Note over DB: Kilit kalkınca Tx B'nin bekleyen sorgusu çalışır ve Tx A'nın eklediği yeni satırı görür!
    DB-->>API: [Tx B] Sonuç: Rezervasyon Var ('mem-1'e ait onaylı kayıt)
    
    Note over API,DB: Tx B çakışma olduğunu tespit eder ve işlemi geri alır.
    API->>DB: [Tx B] ROLLBACK;
    DB-->>API: [Tx B] Transaction İptal Edildi
    
    %% Sakinlere Yanıt Döner
    API-->>Sakin1: Başarılı: Rezervasyonunuz onaylandı! (201 Created)
    API-->>Sakin2: Hata: Bu saat aralığı başka bir sakin tarafından rezerve edildi. (409 Conflict)
```

---

## 3. Kod Seviyesinde Uygulama (tRPC & Drizzle ORM Örneği)

İşlemin tRPC router'ı üzerinde Drizzle ORM ile uygulanma mantığı şu şekildedir:

```typescript
await db.transaction(async (tx) => {
  // 1. SELECT FOR UPDATE ile çakışan kayıtları sorgula ve kilitle
  const existingReservations = await tx
    .select()
    .from(reservations)
    .where(
      and(
        eq(reservations.facilityId, input.facilityId),
        eq(reservations.status, "approved"),
        // Çakışan saat aralığı kontrolü
        sql`(start_time, end_time) OVERLAPS (${input.startTime}, ${input.endTime})`
      )
    )
    .for("update"); // Satır kilitleme (FOR UPDATE)

  if (existingReservations.length > 0) {
    // Çakışma varsa hata fırlat ve Transaction'ı Rollback yap
    throw new TRPCError({
      code: "CONFLICT",
      message: "Tesis bu saat aralığında doludur.",
    });
  }

  // 2. Çakışma yoksa yeni kaydı oluştur
  await tx.insert(reservations).values({
    membershipId: ctx.membershipId,
    facilityId: input.facilityId,
    startTime: input.startTime,
    endTime: input.endTime,
    status: "approved",
  });
});
```

---

## 4. Performans ve Güvenlik Kazanımları
* **Sıfır Çakışma Riski:** Yazılımsal `if-else` kontrolleri yerine veritabanı motorunun ACID standartlarında kilit mekanizması kullanılmıştır.
* **Bellek Verimliliği:** Redis vb. harici bir dağıtık kilit (distributed lock) sunucusuna ihtiyaç duymadan, mevcut PostgreSQL veritabanı yetenekleriyle çözülmüştür.
* **Adil Kullanım:** Aynı anda istek gönderen sakinlerden milisaniye bazında ilk gelenin işlemi önceliklendirilir, diğerleri sıraya alınır.
