import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SettingState {
  dark: boolean;
  salt: boolean;
  instantCopy: boolean;
}

const initialState: SettingState = {
  dark: false,
  salt: false,
  instantCopy: false,
};

const settingProps = createSlice({
  name: "settingProps",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      return { ...state, dark: action.payload };
    },
    setSalt: (state, action: PayloadAction<boolean>) => {
      return { ...state, salt: action.payload };
    },
    setInstantCopy: (state, action: PayloadAction<boolean>) => {
      return { ...state, instantCopy: action.payload };
    },
  },
});

export const { setTheme, setSalt, setInstantCopy } = settingProps.actions;

export default settingProps.reducer;
