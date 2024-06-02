import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import promptReducer from  './slices/promptSlice'
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    chats: chatReducer,
    initialPrompt: promptReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export async function POST(request: Request) {
}
