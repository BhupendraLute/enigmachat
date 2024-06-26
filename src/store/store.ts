import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import allChatsListReducer from './slices/allChatsListSlice';

export const store = configureStore({
  reducer: {
    chats: chatReducer,
    chatslist: allChatsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export async function POST(request: Request) {
}
