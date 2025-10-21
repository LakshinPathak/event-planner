import axios from 'axios';
const API_URL = 'http://localhost:3000/api/customers';

export const getCustomerById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('getCustomerById error:', err.response || err);
    throw err;
  }
};

export const getCustomerEvents = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}/events`);
    return res.data;
  } catch (err) {
    console.error('getCustomerEvents error:', err.response || err);
    throw err;
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('updateCustomer error:', err.response || err);
    throw err;
  }
};

export const getStorybooks = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}/storybooks`);
    return res.data;
  } catch (err) {
    console.error('getStorybooks error:', err.response || err);
    throw err;
  }
};
