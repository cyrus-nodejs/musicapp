
import { configureStore} from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit'
 import  authReducer  from '../features/auth/authSlice';
import   audioReducer from '../features/audio/audioSlice'
import  checkoutReducer from '../features/checkout/checkoutSlice'
import playlistReducer from '../features/playlist/playlistSlice';
import adminReducer from "../features/admin/adminSlice"
export const store = configureStore({
  reducer: {
    auth:authReducer,
    audio:audioReducer,
    checkout:checkoutReducer,
    playlist:playlistReducer,
    admin:adminReducer,
  }
})



// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>