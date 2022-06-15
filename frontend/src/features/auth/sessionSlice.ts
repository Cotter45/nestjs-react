import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authFetch } from '../../app/util/authFetch';
import { RootState, AppThunk } from '../../app/redux/store';

import type { User } from '../../../../prisma/models';

export interface SessionState {
  user: User | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SessionState = {
  user: undefined,
  status: 'idle',
};

export interface LoginAction {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'session/loginUser',
  async ({ email, password }: LoginAction) => {
    const response = await authFetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data.user;
  },
);

export const signup = createAsyncThunk(
  'session/signupUser',
  async (user: User) => {
    const response = await authFetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ user }),
    });
    const data = await response.json();
    return data;
  },
);

export const logout = (): AppThunk => async (dispatch) => {
  const response = await authFetch('/api/logout', {
    method: 'DELETE',
  });
  const data = await response.json();
  dispatch(removeUser());
  return data;
};

export const restore = (): AppThunk => async (dispatch) => {
  const response = await authFetch('/api/restore');
  const data = await response.json();
  console.log(data, 'TEST');
  dispatch(setUser(data.user));
  return data.user;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUser, removeUser } = sessionSlice.actions;

export const currentUser = (state: RootState) => state.session.user;

export default sessionSlice.reducer;
