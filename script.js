document.addEventListener('DOMContentLoaded', () => {
    
    // Dikkat: Artık kebabListesi, kebab_listesi.js dosyasından global olarak erişilebilir.
    // Eğer kebabListesi tanımlı değilse (dosya yüklenmemişse) hata verecektir.

    const kebabNameElement = document.getElementById('kebabName');
    const generateButton = document.getElementById('generateButton');
    
    // Sayfa yüklendiğinde ilk seçimi yap
    generateRandomKebab();

    // Buton olayını dinle
    generateButton.addEventListener('click', generateRandomKebab);

    function generateRandomKebab() {
        // kebabListesi'nin tanımlı ve dizi olduğundan emin olmak iyi bir pratiktir.
        if (typeof kebabListesi === 'undefined' || !Array.isArray(kebabListesi) || kebabListesi.length === 0) {
            kebabNameElement.textContent = "Hata: Kebab listesi bulunamadı!";
            return;
        }

        // Rastgele İndeks Seçimi
        const randomIndex = Math.floor(Math.random() * kebabListesi.length);
        
        // Listeden Kelimeyi Çek
        const selectedKebab = kebabListesi[randomIndex];
        
        // HTML'i Güncelle
        kebabNameElement.textContent = `${selectedKebab} Kebabı`;
    }
});