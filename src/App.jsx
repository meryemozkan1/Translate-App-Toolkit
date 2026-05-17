import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getLanguages, translateText } from "./redux/actions/index";

function App() {
  const dispatch = useDispatch();
  const translateState = useSelector((s) => s.translateReducer);
  const { languages } = useSelector((s) => s.languageReducer);

  const [sourceLang, setSourceLang] = useState({ label: "Turkish", value: "tr" });
  const [targetLang, setTargetLang] = useState({ label: "English", value: "en" });
  const [text, setText] = useState("");
  
  // 1. ve 2. Sorun için yerel hata uyarısı state'i
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []); 

  const formatted = useMemo(() => {
    const data = Array.isArray(languages) ? languages : [];
    return data.map((i) => ({
      label: i.name || i.language,
      value: i.code || i.language,
    }));
  }, [languages]);

  // Çeviri butonuna basıldığında çalışan güvenli fonksiyon
  const handleTranslate = () => {
    // 1. ve 2. SORUNUN ÇÖZÜMÜ: Boşluk ve trim kontrolü
    if (!text || text.trim() === "") {
      setValidationError("Lütfen metin girin"); 
      return; // API'ye istek gönderilmesini engeller, fonksiyonu burada keser
    }

    // Girdi geçerliyse hata mesajını sıfırla ve isteği gönder
    setValidationError("");
    dispatch(translateText({ sourceLang, targetLang, text: text.trim() }));
  };

  return (
    <div className="main-panel">
      <h1 className="text-center text-4xl font-black mb-10 text-white uppercase tracking-widest">ÇEVİRİ +</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-8 text-black">
        <Select className="flex-1 w-full" onChange={setSourceLang} value={sourceLang} options={formatted} placeholder="Kaynak Dil" />
        <button onClick={() => { setSourceLang(targetLang); setTargetLang(sourceLang); }} className="bg-teal-500 p-2 rounded-full text-white shadow-md">🔄</button>
        <Select className="flex-1 w-full" onChange={setTargetLang} value={targetLang} options={formatted} placeholder="Hedef Dil" />
      </div>

      <div className="content-grid">
        <div className="input-box">
          <span className="lang-label">{sourceLang.label}</span>
          <textarea 
            onChange={(e) => {
              setText(e.target.value);
              // Kullanıcı yazı yazmaya başladığı an kırmızı uyarıyı ekrandan kaldırır
              if (e.target.value.trim() !== "") setValidationError(""); 
            }} 
            placeholder="Metni buraya yazın..." 
          />
          {/* 1. ve 2. SORUNUN UI GÖSTERİMİ */}
          {validationError && (
            <p className="error-text" style={{ color: "#ef4444", fontSize: "14px", marginTop: "8px", fontWeight: "bold" }}>
              {validationError}
            </p>
          )}
        </div>
        
        <div className="input-box">
          <span className="lang-label">{targetLang.label}</span>
          <textarea 
         
            value={
              validationError 
                ? "" // Eğer validasyon hatası varsa sağ kutuyu tamamen boşalt (Eski çeviri kalmasın)
                : translateState.error || translateState.isError
                ? "Ağ isteği başarısız oldu. Lütfen internet bağlantınızı kontrol edin." // İnternet yoksa bu hata mesajını bas
                : translateState.answer || "" // Her şey yolundaysa normal çeviriyi göster
            } 
            disabled 
            placeholder={translateState.isLoading ? "Çevriliyor..." : "Çeviri..."} 
            className={`${translateState.answer ? "output-area" : ""} ${translateState.error || translateState.isError ? "text-red-500" : ""}`} 
          />
        </div>
      </div>

      <button 
        onClick={handleTranslate} // Tetikleyici yeni güvenli fonksiyona bağlandı
        className="btn-translate"
        disabled={translateState.isLoading}
      >
        {translateState.isLoading ? "BEKLENİYOR..." : "METNİ ÇEVİR"}
      </button>
    </div>
  );
}

export default App;