// src/features/text/textAPI.js
import axios from 'axios';

export const sendTextToBackend = async (text) => {
  const response = await axios.post('http://localhost:5000/api/text/send-text', {
    selectedText: text,
  });
  return response.data;
};
