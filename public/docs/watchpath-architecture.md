# Sistem Mimarisi ve AI Pipeline: WatchPath

## 1. Mimari Genel Bakış
WatchPath, Next.js App Router üzerinde inşa edilmiş, sunucu tarafında API işlemleri yürüten ve istemci tarafında React Flow ile zengin etkileşim sunan modern bir Full-Stack uygulamasıdır.

```mermaid
graph TB
    subgraph Client ["Frontend - Next.js + React Flow"]
        LP["Landing Page"]
        QM["Soru Modalı"]
        RC["Roadmap Canvas"]
        VP["Video Panel"]
    end

    subgraph API ["API Routes - Next.js"]
        GEN["/api/roadmap/generate"]
        QST["/api/ai/questions"]
        VID["/api/video/id"]
        RDM["/api/roadmap/slug"]
    end

    subgraph Services ["Harici Servisler"]
        YT["YouTube Data API v3"]
        TR["YouTube Transcript"]
        GM["Gemini AI API"]
        SB["Supabase (PostgreSQL)"]
    end

    LP --> GEN
    LP --> QST
    QST --> GM
    GEN --> YT
    GEN --> TR
    GEN --> GM
    GEN --> SB
    RC --> RDM
    VP --> VID
    VID --> SB
    RDM --> SB
```

## 2. AI Tabanlı İçerik Keşif Motoru (Pipeline)
YouTube Data API'nin kotalarını aşmamak ve eski (kaldırılmış) endpointlerin eksikliğini gidermek için özel bir keşif mekanizması geliştirilmiştir:

1. **Arama Genişletme:** Kullanıcının girdiği konu AI tarafından alt kırılımlara ve daha iyi arama terimlerine bölünür (Örn: "React" -> "React Hooks", "React State Management").
2. **Toplu Veri Çekme:** Türetilen terimler ile YouTube Search API taranır. Günde 100 arama limiti `search_cache` tablosunda 7 günlük TTL ile optimize edilir.
3. **Sıfır-Maliyetli Transkript:** Bulunan videoların içerikleri (altyazılar) API kotası harcamadan `youtube-transcript` kütüphanesiyle çekilir.
4. **LLM Analizi:** Çekilen transkript ve metadatalar Google Gemini API'ye gönderilerek pedagojik bir sıraya oturtulur (Önkoşul ilişkileri kurulur).

## 3. Supabase Veritabanı Şeması
Gereksiz karmaşıklıktan kaçınan, ilişkisel ve yüksek performanslı bir yapı tercih edilmiştir.

```mermaid
erDiagram
    ROADMAPS ||--|{ ROADMAP_NODES : contains
    ROADMAP_NODES }o--|| VIDEOS : references

    VIDEOS {
        uuid id PK
        text youtube_id UK
        text title
        text channel_name
        int duration_seconds
        bigint view_count
    }

    ROADMAPS {
        uuid id PK
        text slug UK
        text topic
        text level
        enum status
    }

    ROADMAP_NODES {
        uuid id PK
        uuid roadmap_id FK
        uuid video_id FK
        enum node_type
        text label
        float position_x
        float position_y
        int order_index
    }
```

## 4. Kullanıcı Denayimi ve Etkileşim
Kullanıcılar React Flow tabanlı etkileşimli canvas üzerinde dolaşabilir. Her bir node (düğüm) spesifik bir dersi (videoyu) temsil eder. Node'a tıklandığında sağ yandan açılan (slide-in) Video Panel üzerinden video özeti, süresi ve izleme seçenekleri sunulur.

* **Durum (State) Yönetimi:** API çağrıları için React Query, UI durumları için yerleşik React Hook'ları.
* **Tasarım Sistemi:** Tailwind CSS ile oluşturulmuş, özelleştirilmiş Sage ve Terra renk paletlerine sahip modern arayüz bileşenleri.
