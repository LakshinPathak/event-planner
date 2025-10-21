import axios from 'axios';
const API_URL = 'http://localhost:3000/api/admins';

export const getAllAdmins = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error('getAllAdmins error:', err.response || err);
    throw err;
  }
};

// Example: Admin stats (used in Dashboard)
export const getAdminStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/stats`);
    return res.data;
  } catch (err) {
    console.error('getAdminStats error:', err.response || err);
    throw err;
  }
};
