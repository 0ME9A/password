import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface toggleWindowFace {
  tab?: string;
  timer?: number;
}

const initialState: toggleWindowFace = {
  tab: "",
  timer: 0,
};

const toggleWindowSlice = createSlice({
  name: "toggleWindow",
  initialState,
  reducers: {
    setWindowName: (state, action: PayloadAction<toggleWindowFace>) => {
      // This will toggle the specific key in the state
      return { ...state, ...action.payload };
    },
  },
});

export const { setWindowName } = toggleWindowSlice.actions;
export default toggleWindowSlice.reducer;
