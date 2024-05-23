import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import getGeminiResponse from '@/config/gemini-config';

interface ChatState {
  responses: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  responses: [],
  loading: false,
  error: null,
};

// Async thunk to handle the API call
export const fetchChatResponse = createAsyncThunk(
  'chat/fetchChatResponse',
  async (prompt: string, { rejectWithValue }) => {
    try {
      const response = await getGeminiResponse(prompt);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatResponse.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.responses.push(action.payload);
      })
      .addCase(fetchChatResponse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
