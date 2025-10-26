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
    
    document.addEventListener('DOMContentLoaded', () => {
    const URL = "https://raw.githubusercontent.com/mertemin/turkish-word-list/refs/heads/master/words.txt";
    const kebabNameElement = document.getElementById('kebabName');
    const generateButton = document.getElementById('generateButton');
    
    // Başlangıçta butonun pasif kalması iyi olur
    generateButton.disabled = true;
    kebabNameElement.textContent = "Kebab listesi yükleniyor...";

    // Listeyi internetten çekme fonksiyonu
    async function loadKebabList() {
        try {
            const response = await fetch(URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const textData = await response.text();
            
            // Metni satır satır ayır ve boş satırları temizle
            // split('\n') ile satırlara ayırırız.
            // filter(word => word.trim() !== '') ile boş satırları (veya sadece boşluk içeren satırları) eleriz.
            const loadedList = textData
                .split('\n')
                .map(word => word.trim()) // Başındaki/sonundaki boşlukları temizle
                .filter(word => word.length > 0); // Boş dizeleri at

            // Kebab listemizi artık bu yeni liste ile güncelliyoruz
            // Eğer listeden sadece KEBAB ile alakalı kelimeleri filtrelemek isterseniz, 
            // buraya ek filtreleme (örneğin .filter(word => word.includes("kebap"))) ekleyebilirsiniz.
            // Şimdilik sadece genel kelimeleri kullanıyoruz.
            
            if (loadedList.length === 0) {
                throw new Error("Yüklenen listede kelime bulunamadı.");
            }

            // Başarılı yükleme sonrası butonu aktif et ve olay dinleyicisini ata
            generateButton.disabled = false;
            generateButton.addEventListener('click', () => generateRandomKebab(loadedList));
            
            // İlk rastgele seçimi yap
            generateRandomKebab(loadedList);
            
        } catch (error) {
            console.error("Kebab listesi yüklenirken hata oluştu:", error);
            kebabNameElement.textContent = `HATA: Listeye ulaşılamadı.`;
            generateButton.disabled = true;
        }
    }

    // Rastgele kebab seçme fonksiyonu
    function generateRandomKebab(list) {
        const randomIndex = Math.floor(Math.random() * list.length);
        const selectedWord = list[randomIndex];
        
        // Kebab ismini sonuna "- Kebabı" ekleyerek formatlıyoruz
        kebabNameElement.textContent = `Seçilen: ${selectedWord} Kebabı`;
    }

    // Uygulamayı başlat
    loadKebabList();
});
});
