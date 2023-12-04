import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SettingState {
  dark: boolean;
  salt: boolean;
  instantCopy: boolean;
}

const initialState: SettingState = {
  dark: localStorage.getItem("dark") === "true" ? true : false,
  salt: localStorage.getItem("salt") === "true" ? true : false,
  instantCopy: localStorage.getItem("instantCopy") === "true" ? true : false,
};

const settingProps = createSlice({
  name: "settingProps",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("dark", action.payload.toString());
      return { ...state, dark: action.payload };
    },
    setSalt: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("salt", action.payload.toString());
      return { ...state, salt: action.payload };
    },
    setInstantCopy: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("instantCopy", action.payload.toString());
      return { ...state, instantCopy: action.payload };
    },
  },
});

export const { setTheme, setSalt, setInstantCopy } = settingProps.actions;

export default settingProps.reducer;
