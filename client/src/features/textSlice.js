// src/features/text/textSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendTextToBackend } from './textAPI';

export const processText = createAsyncThunk(
  'text/processText',
  async (text) => {
    const data = await sendTextToBackend(text);
    console.log('Processed text data:', data);
    return data;
  }
);

const textSlice = createSlice({
  name: 'text',
  initialState: {
    wordCount: 0,
    aiResponse :'',
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
        state.aiResponse =action.payload.aiResponse  || '';
      })
      .addCase(processText.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default textSlice.reducer;
