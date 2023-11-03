import { ProPasswordReturnType } from "../../components/types/PasswordAttributesType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// historyItem.ts
export interface HistoryItem extends ProPasswordReturnType {
  // Define the properties of a history item here
  time: string;
}

const historySlice = createSlice({
  name: "history",
  initialState: [] as HistoryItem[],
  reducers: {
    addHistory: (state, action: PayloadAction<HistoryItem>) => {
      // Add the new history item to the start of the array
      state.unshift(action.payload);
    },
    removeHistory: (state, action: PayloadAction<string[]>) => {
      // Remove the history items whose time property is included in the action payload
      return state.filter((item) => !action.payload.includes(item.time));
    },
  },
});

const historyProps = createSlice({
  name: "historyProps",
  initialState: { menu: false, bookmark: true },
  reducers: {
    toggleHistoryBookmark: (state, action: PayloadAction<boolean>) => {
      return { ...state, bookmark: action.payload };
    },
  },
});

export const { addHistory, removeHistory } = historySlice.actions;
export const { toggleHistoryBookmark } = historyProps.actions;
export { historySlice, historyProps };
