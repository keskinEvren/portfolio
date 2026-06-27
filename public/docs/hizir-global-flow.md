# Hızır Global - İş Ortaklığı & Bayilik Başvuru İş Akışı (Workflow)

---

## 1. İş Süreci Genel Bakış
Hızır Global A.Ş., Türkiye, Rusya, Azerbaycan ve diğer global pazarlarda entegre ticaret, e-ticaret, yemek siparişi ve lojistik ekosistemi işleten çok uluslu bir kuruluştur. 

Kurumsal web portalı üzerinden toplanan **Franchise / Bayilik Başvuru Formları**, şirketin operasyonel büyümesinin temel kaynaklarından biridir. Toplanan formların kaybolmadan, ilgili ülkenin ve iş biriminin koordinatörüne anlık olarak yönlendirilmesi ve onay/değerlendirme süreçlerinin uçtan uca izlenebilir olması amacıyla bu iş akışı (workflow) tasarlanmıştır.

---

## 2. Süreç Akış Diyagramı (Workflow Diagram)

Aşağıdaki şema, kurumsal web platformundan alınan bir başvurunun doğrulama, bölgesel yönlendirme (routing), onaylama ve onboarding aşamalarından oluşan yaşam döngüsünü göstermektedir:

```mermaid
graph TD
    %% Aşamalar
    subgraph FrontEnd ["Web Arayüzü & Giriş"]
        A[Ziyaretçi Başvuru Formunu Doldurur] --> B{Form Veri Validasyonu}
        B -- Hatalı/Eksik Giriş --> C[Kullanıcıya Hata Göster & Düzeltme İste]
        C --> A
        B -- Geçerli Giriş --> D[Başvuru Kaydı Oluşturulur]
    end

    subgraph RoutingEngine ["Bölgesel Yönlendirme Motoru (Lead Routing)"]
        D --> E[Coğrafi ve Kategori Bazlı Segmentasyon]
        E --> F{Ülke / Bölge Seçimi?}
        
        F -- Türkiye (TR) --> G[TR Franchise Koordinatör Havuzu]
        F -- Rusya (RU) --> H[RU Bölge Temsilciliği Onay Grubu]
        F -- Azerbaycan (AZ) --> I[AZ Bölge Ofisi İrtibat Masası]
        F -- Diğer Global --> J[Uluslararası İş Geliştirme Masası]
    end

    subgraph AdminEvaluation ["Admin Değerlendirme & Aksiyonlar"]
        G & H & I & J --> K[Otomatik Bildirim Motoru (Slack Webhook & Email)]
        K --> L[İlgili Yönetici Detay Ekranı (Admin Panel)]
        
        L --> M{İlk İnceleme & Mülakat Kararı}
        
        M -- Revizyon / Ek Bilgi İste --> N[Adaya Bilgi Güncelleme Bağlantısı Gönder]
        N --> A
        
        M -- Olumsuz (Reddet) --> O[Otomatik Red Bildirimi Gönder & Lead Kapat]
        
        M -- Olumlu (Onayla) --> P[Sözleşme Aşamasına Taşı]
    end

    subgraph Onboarding ["Onboarding & Entegrasyon"]
        P --> Q[Tüzel Kişilik & Finansal Skorlama Kontrolü]
        Q --> R[Dijital Bayilik Sözleşmesi Oluşturma]
        R --> S[Bayi Kurye/Depo Yönetim Paneli Kurulumu]
        S --> T[Süreç Tamamlandı (Aktif Bayi)]
    end

    %% Stil Kodları
    classDef main fill:#222,stroke:#888,stroke-width:1px,color:#fff;
    classDef decision fill:#111,stroke:#666,stroke-width:2px,color:#fff;
    classDef success fill:#0f0,stroke:#333,stroke-width:2px,color:#000;
    
    class A,D,E,G,H,I,J,K,L,N,O,P,Q,R,S main;
    class B,F,M decision;
    class T success;
```

---

## 3. Sistem Kuralları & Yönlendirme Mantığı

1. **Çok Dilli Validasyon:** Form alanları (özellikle telefon kodları ve vergi numarası formatları) seçilen ülkeye göre dinamik regex kontrolleriyle doğrulanır.
2. **Akıllı Bölgesel Dağıtım (Geographic Routing):** Başvuru sahibinin seçtiği faaliyet bölgesi veritabanında taranarak, o bölgenin aktif koordinatör grubunun `Admin` paneline anında atanır.
3. **SLA Takibi & Bildirim:** Bir başvuru koordinatör ekranına düştükten sonra 24 saat içinde ilk inceleme yapılmazsa, sistem otomatik olarak sorumlu yöneticiye e-posta ve Slack kanalı üzerinden "Geciken Talep" hatırlatması gönderir.
4. **Entegrasyonlar:** Onaylanan bayiler için Hızır Global sistemlerinde (Yetiş+ Çarşı, Kurye ve Depo modülleri) otomatik hesap açılış istekleri tetiklenerek insan gücü gereksinimi azaltılır.
