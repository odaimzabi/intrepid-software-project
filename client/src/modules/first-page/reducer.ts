import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../redux";

interface InitialState {
  message: string | null;
  pong: string | null;
}

const initialState: InitialState = {
  message: null,
  pong: null,
};

const firstPageReducer = createSlice({
  initialState,
  name: "first-page-reducer",

  reducers: {
    setData: (state: any, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    setPong: (state: any, { payload }: PayloadAction<string>) => {
      state.pong = payload;
    },
  },
});

export const { setData, setPong } = firstPageReducer.actions;

export const handleSocketIoData = (payload: string): AppThunk => {
  return (dispatch) => {
    dispatch(setData(payload));
  };
};

export const handlePongData = (payload: string): AppThunk => {
  return (dispatch) => {
    dispatch(setPong(payload));
  };
};

export default firstPageReducer.reducer;
