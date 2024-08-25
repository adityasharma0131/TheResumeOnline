import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  selectedTemplate: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },

    setCurrentTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { setTemplates, setCurrentTemplate } = templateSlice.actions;

export default templateSlice.reducer;
