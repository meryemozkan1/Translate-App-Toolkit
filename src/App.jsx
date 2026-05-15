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

  useEffect(() => {
    // Sadece bileşen yüklendiğinde BİR KEZ çalışır. 429 hatasını bu önler.
    dispatch(getLanguages());
  }, []); 

  const formatted = useMemo(() => {
    const data = Array.isArray(languages) ? languages : [];
    return data.map((i) => ({
      label: i.name || i.language,
      value: i.code || i.language,
    }));
  }, [languages]);

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
          <textarea onChange={(e) => setText(e.target.value)} placeholder="Metni buraya yazın..." />
        </div>
        
        <div className="input-box">
          <span className="lang-label">{targetLang.label}</span>
          <textarea 
            value={translateState.answer || ""} 
            disabled 
            placeholder={translateState.isLoading ? "Çevriliyor..." : "Çeviri..."} 
            className={translateState.answer ? "output-area" : ""} 
          />
        </div>
      </div>

      <button 
        onClick={() => dispatch(translateText({ sourceLang, targetLang, text }))} 
        className="btn-translate"
        disabled={translateState.isLoading}
      >
        {translateState.isLoading ? "BEKLENİYOR..." : "METNİ ÇEVİR"}
      </button>
    </div>
  );
}

export default App;