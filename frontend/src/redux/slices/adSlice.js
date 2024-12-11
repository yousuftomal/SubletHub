import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const response = await axios.get('http://localhost:5000/api/ads');
  return response.data;
});

export const postAd = createAsyncThunk('ads/postAd', async (adData, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/ads', adData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); // Ensure the token is included in the headers
    return response.data;
  } catch (error) {
    console.error('Error posting ad:', error); // Log the error for debugging
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


const adSlice = createSlice({
  name: 'ads',
  initialState: { ads: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAd.pending, (state) => { state.isLoading = true; })
      .addCase(postAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postAd.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adSlice.reducer;
