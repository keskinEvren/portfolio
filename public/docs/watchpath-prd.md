# Product Requirements Document (PRD): WatchPath

## 1. Problem Tanımı (Tutorial Hell)
YouTube'da yeni bir konu öğrenmek isteyen kullanıcılar, doğrusal (lineer) ve genellikle eksik video listeleriyle karşılaşmaktadır. Hangi videonun önce izlenmesi gerektiği, hangi kaynakların daha kaliteli olduğu veya konular arasındaki hiyerarşik bağların ne olduğu belirsizdir. Bu durum, kullanıcıların sonsuz bir video döngüsüne girmesine ("tutorial hell") ve ilerleme kaydedememesine neden olmaktadır.

## 2. Çözüm
Kullanıcının girdiği herhangi bir konu veya YouTube linkini analiz ederek, o konu etrafında **yapısal ve interaktif bir zihin haritası (roadmap)** oluşturan AI destekli bir web uygulaması.

### Temel Farklılaştırıcılar (USPs)
1. **Çoklu Video Keşfi:** Tek bir videonun özetini çıkarmak yerine, birden fazla farklı kanaldan en iyi videoları bularak bunları bir haritada birleştirir.
2. **Önkoşul Sıralaması (Prerequisites):** Yapay zeka, öğrenme hiyerarşisini kurarak hangi videonun diğerinden önce izlenmesi gerektiğini belirler.
3. **Otomatik Keşif Modülasyonu:** Kullanıcının spesifik bir oynatma listesi sunmasına gerek yoktur; yalnızca "React Öğrenmek İstiyorum" demesi yeterlidir.

## 3. Hedef Kitle
* Kendi kendine öğrenen öğrenciler (yazılım, dil, matematik vb.)
* Bootcamp veya uzun süreli kurslara alternatif arayan profesyoneller
* Sınavlara veya sertifikalara kendi temposunda hazırlanan kişiler

## 4. MVP Başarı Metrikleri
* MVP fazında aktif **50+ kullanıcıdan** kalitatif geri bildirim toplanması.
* Platform üzerinde günlük **10+ roadmap** (öğrenme haritası) oluşturulması.
* Kullanıcı elde tutma (Retention) oranının **>%20** seviyesinde gerçekleşmesi.

## 5. Rakip Analizi & Konumlandırma
* **Mapify:** Sadece tek bir video için zihin haritası oluşturur (Çoklu video desteği yok).
* **roadmap.sh:** Statik haritalar sunar, dinamik YouTube entegrasyonu barındırmaz.
* **WatchPath Konumlandırması:** Hem dinamik içerik keşfini (YouTube Data API) hem de görsel haritalamayı (React Flow) yapay zeka (Gemini) ile entegre eden tek çözümdür.
