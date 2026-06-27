# Sherlith - Headless E-ticaret & Zustand Sepet Yönetimi PRD

---

## 1. Doküman Kontrolü & Genel Bakış
* **Proje Adı:** Sherlith - Gothic Digital Universe & E-commerce
* **Doküman Sürümü:** v1.0
* **Tarih:** 25 Ekim 2025
* **Hazırlayan:** Evren Keskin (Lead Product Owner & Technical Architect)
* **Durum:** Geliştirme Aşamasında / Aktif

### 1.1 Proje Amacı
Sherlith, sıradan e-ticaret sitelerinin ötesine geçerek gotik edebiyat, müzikal atmosfer ve interaktif 3D (Three.js) unsurları birleştiren sanatsal bir dijital evrendir. Sitede yer alan ağır grafik öğeleri ve arka planda çalan kesintisiz müzik akışı nedeniyle, sayfa geçişlerinin ve sepet işlemlerinin sayfayı yenilemeden (Single Page App - SPA hızında) sıfır gecikmeyle gerçekleşmesi kritik bir kullanıcı deneyimi (UX) gereksinimidir.

Bu doğrultuda; backend olarak **WordPress / WooCommerce** (WPGraphQL eklentisi aracılığıyla), frontend olarak **Next.js** ve sepet/durum yönetimi için istemci tarafında **Zustand** tercih edilmiştir.

---

## 2. Headless Sistem Mimarisi & Veri Akışı

Aşağıdaki şemada, Next.js frontend, Zustand istemci hafızası, WordPress GraphQL API'si ve PayTR ödeme entegrasyonunun birbiriyle olan ilişkisi gösterilmektedir:

```mermaid
graph TD
    %% Bileşenler
    UI["Next.js Client (UI / Three.js)"]
    Zustand["Zustand Cart Store (İstemci Hafızası)"]
    Storage["Browser LocalStorage (Persist State)"]
    API["Next.js API Routes (BFF Katmanı)"]
    WP["WooCommerce (WPGraphQL)"]
    PayTR["PayTR API Gateway"]
    Webhook["Next.js Webhook Handler"]

    %% Veri Akışı
    UI -->|1. Sepete Ekle / Çıkar| Zustand
    Zustand <-->|2. Sepeti Eşitle / Sakla| Storage
    UI -->|3. Ödeme Başlat (Checkout)| API
    API -->|4. Sepet Doğrulama & Stok Sorgusu| WP
    API -->|5. Token Talebi & Hash İmzalama| PayTR
    PayTR -->|6. Ödeme Formu Token'ı üretir| API
    API -->|7. Ödeme Token'ını Döner| UI
    UI -->|8. PayTR Iframe Formu Gösterilir| UI
    PayTR -->|9. Ödeme Başarılı Callback| Webhook
    Webhook -->|10. Sipariş Onaylandı ve Stok Düşüldü| WP
```

---

## 3. Zustand Sepet Yönetimi Fonksiyonel Gereksinimleri

İstemci tarafındaki sepet durumunu (cart state) yönetmek üzere tasarlanan Zustand deposu (`cartStore`), aşağıdaki metodları ve kuralları içermelidir:

### 3.1 Sepet Durum Yapısı (State Definition)
```typescript
interface CartItem {
  productId: string;
  databaseId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
}
```

### 3.2 Temel Sepet Kuralları (Business Rules)
* **Kural 3.2.1 (Persist):** Sepet durumu, sayfa yenilendiğinde veya tarayıcı kapatıldığında kaybolmaması için tarayıcının `LocalStorage` alanında şifresiz olarak saklanmalıdır (Zustand `persist` middleware'i kullanılmalıdır).
* **Kural 3.2.2 (Stok Sınırı):** Kullanıcı bir üründen stokta olandan fazlasını sepete ekleyememelidir. Eğer ürün stokta sınırlıysa, sepetteki artış butonu pasif hale getirilmelidir.
* **Kural 3.2.3 (Milisaniye Reaksiyonu):** Sepete ürün ekleme veya adet değiştirme işlemleri doğrudan Zustand store üzerinden UI'a yansıtılmalı, WooCommerce tarafına her tıklamada API isteği atılmamalıdır. Sepet nihai olarak ödeme adımında doğrulanacaktır.

---

## 4. PayTR Headless Ödeme Entegrasyon Gereksinimleri

Headless mimaride ödeme formu, sunucu tarafında oluşturulan benzersiz bir hash doğrulamasıyla çalışır. Güvenlik gerekçesiyle PayTR API'sine doğrudan istemciden (client-side) istek atılamaz.

### 4.1 Ödeme Adımları
1. **Sepet Onayı:** Kullanıcı ödeme sayfasına geldiğinde, Zustand sepetindeki ürünler ve fiyatlar Next.js API katmanına (`/api/checkout`) gönderilir.
2. **WooCommerce Stok Kilitleme:** API katmanı, WooCommerce GraphQL API'sine istek atarak sepetteki ürünlerin stok durumlarını ve fiyat doğruluğunu teyit eder.
3. **PayTR Token İstemi:** Fiyatlar eşleştiğinde, API katmanı PayTR'ın talep ettiği parametreleri (Merchant ID, Sipariş ID, Tutar, Kullanıcı IP vb.) toplar. Bu parametreleri gizli anahtarla (API Key ve Salt) şifreleyerek (`sha256 hmac`) PayTR API'sine istek gönderir.
4. **Iframe Render:** PayTR'dan dönen `token` değeriyle Next.js frontend tarafında güvenli bir Iframe açılır.
5. **Callback & Sipariş Oluşturma:** Ödeme tamamlandığında PayTR, Next.js webhook adresine (`/api/payment-callback`) şifreli bir POST isteği gönderir. Webhook, imza doğruluğunu kontrol ettikten sonra WooCommerce üzerinde sipariş durumunu "Ödeme Alındı" (Processing) olarak günceller ve Zustand sepeti temizlenir.
