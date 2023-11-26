// localStorageMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from "../../RTK/store"; 

const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);

    localStorage.setItem('passwords', JSON.stringify(store.getState().history));

  return result;
};

export default localStorageMiddleware;
