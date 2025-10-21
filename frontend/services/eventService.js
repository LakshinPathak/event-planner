import axios from 'axios';
const API_URL = 'http://localhost:3000/api/events';

export const getAllEvents = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error('getAllEvents error:', err.response || err);
    throw err;
  }
};

export const getEventById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('getEventById error:', err.response || err);
    throw err;
  }
};

export const createEvent = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (err) {
    console.error('createEvent error:', err.response || err);
    throw err;
  }
};
