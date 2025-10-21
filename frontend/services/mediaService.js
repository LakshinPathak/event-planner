import axios from 'axios';
const API_URL = 'http://localhost:3000/api/media';

export const getSocialPosts = async (customerId) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${customerId}`);
    return res.data;
  } catch (err) {
    console.error('getSocialPosts error:', err.response || err);
    throw err;
  }
};
