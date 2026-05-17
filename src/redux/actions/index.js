import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// DİLLER
export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {

    return [
      { code: "tr", name: "Turkish" },
      { code: "en", name: "English" },
      { code: "de", name: "German" },
      { code: "fr", name: "French" },
      { code: "es", name: "Spanish" },
      { code: "it", name: "Italian" },
      { code: "ru", name: "Russian" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" },
      { code: "zh", name: "Chinese" },
      { code: "ar", name: "Arabic" },
    ];
  }
);


// ÇEVİRİ
export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ text, sourceLang, targetLang }) => {

    const res = await axios.get(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang.value}|${targetLang.value}`
    );

    console.log(res.data);

    return res.data.responseData.translatedText;
  }
);