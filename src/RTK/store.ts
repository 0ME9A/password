import { historySlice, historyProps } from "./slices/history";
import { configureStore } from "@reduxjs/toolkit";

import toggleWindowSlice from "./slices/toggleWindow";
import settingProps from "./slices/setting";

export const store = configureStore({
  reducer: {
    history: historySlice.reducer,
    historyProps: historyProps.reducer,
    settingProps: settingProps,
    activeWindow: toggleWindowSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
