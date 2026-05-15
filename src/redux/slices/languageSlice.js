import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../actions/index";

const initialState = {
  isLoading: false,
  error: null,
  languages: [],
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.languages = action.payload; // Aksiyondan gelen veri buraya atanıyor
    });
    builder.addCase(getLanguages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default languageSlice.reducer;
