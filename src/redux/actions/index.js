import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "YOUR_API_KEY";

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

    return res.data;
  }
);

export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ text, source, target }) => {
    const res = await axios.post(
      "https://openl-translate.p.rapidapi.com/translate",
      {
        text: text,
        source: source,
        target: target,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "openl-translate.p.rapidapi.com",
        },
      }
    );

    return res.data.translatedText;
  }
);