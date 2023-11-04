import { setWindowName } from "../RTK/slices/toggleWindow";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

interface backToMainTabFace {
  dispatch: Dispatch<AnyAction>;
  timer?: number;
}

const backToMainTab = ({ dispatch, timer = 300 }: backToMainTabFace) => {
  dispatch(setWindowName({ timer }));
  setTimeout(() => {
    dispatch(setWindowName({ tab: "", timer: 0 }));
  }, timer);
};

export default backToMainTab;
