import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "9b6ef36538mshf715ea1f670b93bp1af15cjsn485435c9c67f";


// DİLLER
export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    const res = await axios.get(
      "https://openl-translate.p.rapidapi.com/translate/languages",
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "openl-translate.p.rapidapi.com",
        },
      }
    );

    console.log("LANGUAGES:", res.data);

    return res.data.languages || res.data || [];
  }
);


// ÇEVİRİ
export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ text, source, target }) => {

    const res = await axios.post(
      "https://openl-translate.p.rapidapi.com/translate/bulk",
      {
        target_lang: target,
        source_lang: source,
        texts: [text],
      },
      {
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "openl-translate.p.rapidapi.com",
        },
      }
    );

    console.log("TRANSLATE:", res.data);

    return res.data.translatedTexts?.[0] || "";
  }
);