import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const toggleWindowSlice = createSlice({
  name: "toggleWindow",
  initialState: "",
  reducers: {
    setWindowName: (state, action: PayloadAction<string>) => {
      // This will toggle the specific key in the state
      return action.payload;
    },
  },
});

export const { setWindowName } = toggleWindowSlice.actions;
export default toggleWindowSlice.reducer;
