import axios from 'axios';
const API_URL = 'http://localhost:3000/api/gifts';

export const getAllGifts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error('getAllGifts error:', err.response || err);
    throw err;
  }
};

export const orderGift = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/orders`, data);
    return res.data;
  } catch (err) {
    console.error('orderGift error:', err.response || err);
    throw err;
  }
};
