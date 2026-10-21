# Plakçı: kurulum adımları

Klasördeki dosyalar:

| Dosya | Ne işe yarar |
|---|---|
| index.html | Uygulamanın tamamı (WebGL sahne, player, hava, visualizer) |
| manifest.json | Uygulama adı, ikon, renkler |
| sw.js | Çevrimdışı önbellek (CACHE_NAME burada) |
| scene.webp | Kolu silinmiş arka plan |
| disc.webp | Dönen plak dokusu |
| sheen.png | Plağın üstündeki sabit güneş parlaması |
| arm.png | Ton kolu (ayrı katman) |
| maps.png | Pencere maskesi + güneş haritası (shader için) |
| icon-*.png | Uygulama ikonları |

---

## 1. GitHub Pages'e yükle

1. github.com'da yeni repo aç, adı: `plakci`
2. Bu klasördeki **tüm dosyaları** repo köküne yükle (KURULUM.md hariç olabilir)
3. Repo > **Settings** > **Pages**
4. **Source**: `Deploy from a branch`
5. **Branch**: `main`, klasör: `/ (root)` > **Save**
6. 1-2 dakika bekle. Adres: `https://KULLANICI.github.io/plakci/`
7. Telefondan bu adresi Chrome'da aç, çalıştığını gör

## 2. APK üret (PWABuilder)

1. pwabuilder.com aç, adresi yapıştır: `https://KULLANICI.github.io/plakci/` > **Start**
2. **Package For Stores** > **Android** > **Generate Package**
3. **All Settings** kısmında:
   - **Package ID**: `co.promptart.plakci`
   - **App name**: `Plakçı`
   - **Display mode**: `Standalone`
   - **Signing key**: `Create new` (ilk sefer)
4. **Download** ile zip'i indir
5. Zip'in içindeki **signing.keystore** ve **signing-key-info.txt** dosyalarını güvenli bir yere yedekle. Güncelleme APK'larında aynı anahtar şart, kaybolursa uygulama güncellenemez.

## 3. Üst bardaki adresi gizle (assetlinks)

Üstte `kullanici.github.io` yazısının çıkmaması için Android'in siteyi doğrulaması gerekiyor. Doğrulama dosyası **alan adının kökünde** olmalı, yani `plakci` reposunda değil, kullanıcı sitesi reposunda.

1. GitHub'da `KULLANICI.github.io` adında bir repo yoksa aç (tam bu adla)
2. Bu repoya kökte `.nojekyll` adında **boş** bir dosya ekle (olmazsa GitHub nokta ile başlayan klasörü yayınlamaz)
3. Aynı repoda `.well-known` klasörü oluştur, içine PWABuilder zip'inden çıkan **assetlinks.json** dosyasını koy
4. Settings > Pages'i bu repo için de `main` / `root` olarak aç
5. Kontrol: tarayıcıda `https://KULLANICI.github.io/.well-known/assetlinks.json` açılınca JSON görünmeli
6. APK'yı telefona yeniden kur. İlk açılışta adres çubuğu artık görünmez

Not: assetlinks.json içindeki `sha256_cert_fingerprints` imzalama anahtarına bağlı. Anahtarı değiştirirsen bu dosyayı da güncellemen gerekir.

## 4. İlk açılış

1. **Klasör seç**'e dokun
2. Android dosya seçicide **Music** (ya da şarkıların olduğu klasör) > **Bu klasörü kullan** > **İzin ver**
3. Uygulama klasörü hatırlar. Sonraki açılışlarda Android bazen izni tekrar sorar, o zaman **Rafı aç**'a bir kez dokunman yeter.
4. Konum izni sorulursa **izin ver**: pencere dışı senin şehrinin gerçek havasını ve gün doğumu/batımını gösterir. Vermezsen saat bilgisiyle çalışır.

Android 11 ve sonrası, dahili hafızanın kökünü ve **Download** klasörünün kendisini seçmeye izin vermiyor. Şarkılar Download içindeyse onları bir alt klasöre (örnek: `Download/Muzik`) ya da **Music** klasörüne taşı.

## 5. Kullanım

- **Plağa dokun**: çal / durdur
- **Sahnede sağa/sola kaydır**: önceki / sonraki parça
- **Görsel**: Bokeh > Dalga > Toz > Kapalı
- **Atmosfer**: Zaman (Oto, Sabah, Gündüz, Akşam, Gece) ve Hava (Oto, Açık, Bulutlu, Yağmur, Fırtına, Kar, Sis, Rüzgâr)
- **Sıra**: Düz > Karışık > Tekrar
- İlerleme çizgisine dokununca iğne kalkıp o noktaya gider
- Kol şarkı ilerledikçe plağın içine doğru ilerler

## 6. Güncelleme yaparken

1. Dosyaları değiştir
2. **sw.js içinde `CACHE_NAME` sürümünü artır** (`plakci-v1` > `plakci-v2`)
3. GitHub'a yükle
4. Sadece web dosyaları değiştiyse APK'yı yeniden üretmene gerek yok, uygulama bir sonraki açılışta yeniyi alır
