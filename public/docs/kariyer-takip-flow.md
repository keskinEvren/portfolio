# Kariyer Takip Portalı - Kullanıcı Akış Şeması (User Flow)

---

## 1. Genel Akış Açıklaması
Bu doküman, **Kariyer Takip Portalı** üzerindeki üç ana rolün (Öğrenci, Öğretmen, Admin) staj süreci boyunca gerçekleştirdiği işlemleri ve veri akışını gösteren fonksiyonel akış şemasını içerir. 

Süreç, öğrencinin sisteme kaydolmasıyla başlar, staj başvurusu ve evrak onay süreçleriyle devam eder ve öğrencinin günlük staj defteri girişlerinin danışman öğretmen tarafından incelenip onaylanmasıyla son bulur.

---

## 2. Kullanıcı Akış Diyagramı (User Flow Diagram)

Aşağıdaki akış şeması, staj başvurusundan nihai staj onayına kadar geçen süreçteki karar mekanizmalarını ve rol etkileşimlerini göstermektedir:

```mermaid
graph TD
    %% Rol Bazlı Akış
    subgraph StudentFlow ["Öğrenci Akışı"]
        A[Sisteme Giriş / Kayıt] --> B{Aktif Staj Var mı?}
        B -- Evet --> C[Staj Defteri / Günlük Rapor Ekranı]
        B -- Hayır --> D[Yeni Başvuru Formunu Doldur]
        D --> E[Zorunlu Evrakları Yükle (PDF)]
        E --> F[Başvuruyu Gönder]
        C --> G[Günlük Çalışmaları Gir/Güncelle]
        G --> H[Stajı Bitir ve Değerlendirmeye Gönder]
    end

    subgraph TeacherFlow ["Öğretmen / Danışman Akışı"]
        F --> I{Başvuru Detayını İncele}
        I -- Eksik/Hatalı --> J[Revizyon İstemi & Açıklama Gir]
        J --> D
        I -- Uygun --> K[Başvuruyu Koordinatör Onayına Sevk Et]
        
        G --> L{Günlük Raporları Oku}
        L -- Revizyon Gerekli --> M[Rapor Revizyon Notu Yaz]
        M --> G
        L -- Onayla --> N[Haftalık Onay Durumunu Güncelle]
    end

    subgraph AdminFlow ["Koordinatör / Admin Akışı"]
        K --> O{Evrak ve Kontenjan Kontrolü}
        O -- Reddet --> P[Başvuru İptal / Revizyon Bildirimi]
        P --> D
        O -- Onayla --> Q[Staj Durumunu 'Aktif' Olarak Güncelle]
        Q --> C
        
        H --> R{Staj Sonu Notları & Rapor İncelemesi}
        R -- Defter Eksik --> S[Eksik Rapor Revizyon Talebi]
        S --> G
        R -- Başarılı --> T[Stajı Tamamlandı Olarak Kapat]
        N --> R
    end

    %% Stil Tanımlamaları
    classDef startEnd fill:#333,stroke:#fff,stroke-width:2px,color:#fff;
    classDef decision fill:#111,stroke:#888,stroke-width:2px,color:#fff;
    classDef process fill:#222,stroke:#555,stroke-width:1px,color:#fff;
    
    class A,T startEnd;
    class B,I,L,O,R decision;
    class C,D,E,F,G,H,J,K,M,N,P,Q,S process;
```

---

## 3. Süreç Adımları Detayları

1. **Giriş ve Kontrol:** Öğrenci sisteme girdiğinde aktif bir stajı olup olmadığı arka planda sorgulanır. Aktif stajı varsa doğrudan **Staj Defteri** ekranına yönlendirilir.
2. **Başvuru Toplama:** Aktif stajı olmayan öğrenci staj yapacağı firmanın verilerini girer, okul tarafından istenen sigorta formunu sisteme yükler ve onay sürecini başlatır.
3. **Öğretmen İncelemesi:** Danışman öğretmen portal üzerinden öğrencinin başvurusunu inceler. Eğer firmanın sektörü veya staj tarihleri akademik takvime uygun değilse gerekçe belirterek öğrenciye geri gönderir.
4. **Koordinatör Onayı:** Danışman öğretmenin onayladığı başvuru, okulun resmi staj kontenjanları ve bütçe planlamasına göre nihai onay için koordinatöre iletilir. Koordinatör onayladığı anda staj "Aktif" duruma geçer.
5. **Girişler ve Kapanış:** Öğrenci staj yaptığı her gün portalı açarak o gün yaptığı işleri yazar. Öğretmen bu girişleri düzenli olarak kontrol eder. Staj süresi bitince öğrenci "Staj Sonu Değerlendirmesi" talebi gönderir, raporlar incelenir ve başarılı ise staj mezuniyet kütüğüne işlenmek üzere "Tamamlandı" olarak işaretlenir.
