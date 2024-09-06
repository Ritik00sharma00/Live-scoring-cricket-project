import { createSlice } from '@reduxjs/toolkit';

// Define the shape of the auth state
interface AuthState {
  isAuthenticated: boolean;
}

// Load initial state from sessionStorage
const loadAuthState = (): AuthState => {
  const savedState = sessionStorage.getItem('authState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return { isAuthenticated: false };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      sessionStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      sessionStorage.removeItem('authState');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
