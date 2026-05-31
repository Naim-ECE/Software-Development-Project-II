import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password: _password, role }: { email: string; password: string; role: UserRole }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const names: Record<UserRole, string> = {
      customer: 'Alex Johnson',
      vendor: 'Sarah Chen',
      inventory_manager: 'Mike Ross',
      admin: 'Admin User',
    };
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: names[role],
      email,
      role,
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password: _password, role }: { name: string; email: string; password: string; role: UserRole }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    restoreSession: (state) => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          state.user = JSON.parse(stored);
          state.isAuthenticated = true;
        } catch {
          localStorage.removeItem('user');
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Invalid email or password';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Registration failed';
      });
  },
});

export const { logout, restoreSession, clearError } = authSlice.actions;
export default authSlice.reducer;
