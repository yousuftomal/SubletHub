import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser  = createAsyncThunk('auth/loginUser ', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    
    // Ensure isAdmin is set based on the role from the response
    return { ...response.data, isAdmin: response.data.user.role === 'admin' }; // Set isAdmin based on role
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLoading: false, error: null, isAdmin: false },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      state.user = null;
      state.token = null;
      state.isAdmin = false; // Reset isAdmin on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser .pending, (state) => { state.isLoading = true; })
      .addCase(loginUser .fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Set user
        state.token = action.payload.token; // Set token
        state.isAdmin = action.payload.isAdmin; // Set isAdmin
        state.error = null;
      })
      .addCase(loginUser .rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
