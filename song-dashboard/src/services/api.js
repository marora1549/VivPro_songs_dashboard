import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/songs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

export const searchSongsByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/songs/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error searching songs:', error);
    throw error;
  }
};

export const updateSongRating = async (songId, rating) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/songs/${songId}/rate`, { star_rating: rating });
    return response.data;
  } catch (error) {
    console.error('Error updating song rating:', error);
    throw error;
  }
};