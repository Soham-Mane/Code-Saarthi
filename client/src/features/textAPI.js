// src/features/text/textAPI.js
import axios from 'axios';

export const sendTextToBackend = async (text) => {
  const response = await axios.post('http://localhost:8000/api/text/send-text', {
    selectedText: text,
  });
  console.log('Response from backend:',response.data);
  return response.data;
};
