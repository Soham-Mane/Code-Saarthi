// src/features/text/textSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendTextToBackend } from './textAPI';

export const processText = createAsyncThunk(
  'text/processText',
  async (text) => {
    const data = await sendTextToBackend(text);
    return data;
  }
);

const textSlice = createSlice({
  name: 'text',
  initialState: {
    wordCount: 0,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processText.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(processText.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wordCount = action.payload.wordCount;
      })
      .addCase(processText.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default textSlice.reducer;
