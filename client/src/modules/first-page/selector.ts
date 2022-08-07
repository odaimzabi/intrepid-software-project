import { RootState } from "../../redux";

export const selectFirstPageState = (state: RootState) =>
  state.firstPageReducer;
