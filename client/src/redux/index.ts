import {
  Action,
  configureStore,
  ThunkAction,
  applyMiddleware,
} from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
