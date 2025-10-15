// Rastgele bir kelime seçme ve HTML'e yazma fonksiyonu
function rastgeleKebabSecVeYaz(kebabTurleri) {
    // Liste boşsa veya tanımsızsa bir şey yapma
    if (!kebabTurleri || kebabTurleri.length === 0) {
        document.getElementById('kebabName').textContent = "Kelimeler Yüklenemedi Kebabı";
        console.error("Kebab listesi boş veya yüklenemedi.");
        return;
    }

    // 1. Rastgele indeks seçimi
    const randomIndex = Math.floor(Math.random() * kebabTurleri.length);
    
    // 2. Seçilen kelime
    const rastgeleKelime = kebabTurileri[randomIndex];
    
    // 3. HTML elementini bulma
    const kebabNameElement = document.getElementById('kebabName');
    
    // 4. İçeriği güncelleme
    kebabNameElement.textContent = rastgeleKelime + " Kebabı";
}

// TXT dosyasını çekme (fetch) işlemi
fetch('kelimeler.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Hata! Durum: ${response.status}`);
        }
        // Yanıtı DÜZ METİN olarak al
        return response.text();
    })
    .then(data => {
        // Metni satır sonu karakterlerine (\n) göre bölerek bir dizi oluştur
        // .filter(Boolean) metni bölerken oluşabilecek boş satırları (örn. dosyanın sonundaki boş satır) temizler.
        const kebabTurleri = data.split('\n').map(s => s.trim()).filter(Boolean);
        
        // Listeyi rastgele seçim fonksiyonuna gönder
        rastgeleKebabSecVeYaz(kebabTurleri);
    })
    .catch(error => {
        console.error('Kelimeler yüklenirken bir sorun oluştu:', error);
        
        // Hata durumunda bir yedek metin gösterme
        document.getElementById('kebabName').textContent = "Yükleme Hatası Kebabı";
    });