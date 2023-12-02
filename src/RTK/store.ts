import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { githubApiContributors } from "./RTKQuery/contributors";
import { historySlice, historyProps } from "./slices/history";
import { setupListeners } from "@reduxjs/toolkit/query";
import toggleWindowSlice from "./slices/toggleWindow";
import settingProps from "./slices/setting";

// Create a root reducer that combines your existing reducers and the API service reducer
const rootReducer = combineReducers({
  history: historySlice.reducer,
  historyProps: historyProps.reducer,
  settingProps: settingProps,
  activeWindow: toggleWindowSlice,
  // Add the generated reducer as a specific top-level slice
  [githubApiContributors.reducerPath]: githubApiContributors.reducer,
});

// Create the store with the root reducer and the middleware of the API service
export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApiContributors.middleware),
});

// Call the setupListeners function to enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// Export the store
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {history: HistoryState, historyProps: HistoryPropsState, settingProps: SettingPropsState, activeWindow: ActiveWindowState, githubApi: GithubApiState}
export type AppDispatch = typeof store.dispatch;
