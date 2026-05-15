import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  error: null,
  answer: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.answer = "";
    });
    builder.addCase(translateText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      
      // DÜZELTME BURADA: 
      // Gelen veri doğrudan metin olduğu için .translatedText kısmını sildik.
      state.answer = action.payload; 
    });
  },
});

export default translateSlice.reducer;