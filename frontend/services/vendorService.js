import axios from 'axios';
const API_URL = 'http://localhost:3000/api/vendors';

export const getAllVendors = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error('getAllVendors error:', err.response || err);
    throw err;
  }
};

export const getVendorById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('getVendorById error:', err.response || err);
    throw err;
  }
};
