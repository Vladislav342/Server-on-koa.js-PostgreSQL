import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import axios from 'axios';
import { API_URL } from '../../http/index';
import { InitialStateDto, UserParams } from '../../types/types';

const initialState: InitialStateDto = {
  id: undefined,
  login: '',
  isAuth: false,
  error: '',
  loading: false,
};

export const logIn = createAsyncThunk<AuthResponse, UserParams, { rejectValue: string }>(
  'api/login',
  async function (userData, { rejectWithValue }) {
    const response = await AuthService.login(userData.login, userData.password);
    if (response.status === 200 && response.data?.accessToken) {
      const data = await response.data;
      localStorage.setItem('token', data?.accessToken);
      return data;
    }
    if (response.data.message) {
      return {
        accessToken: '',
        refreshToken: '',
        user: [
          {
            id: 0,
            login: '',
          },
        ],
        message: response.data.message,
      } as AuthResponse;
    }

    return rejectWithValue('Please sign in');
  },
);

export const signIn = createAsyncThunk<AuthResponse, UserParams, { rejectValue: string }>(
  'api/signin',
  async function (userData, { rejectWithValue }) {
    const response = await AuthService.registration(userData.login, userData.password);
    if (response.status === 200 && response.data?.accessToken) {
      const data = await response.data;
      localStorage.setItem('token', data?.accessToken);
      return data;
    }
    if (response.data.message) {
      return {
        accessToken: '',
        refreshToken: '',
        user: [
          {
            id: 0,
            login: '',
          },
        ],
        message: response.data.message,
      } as AuthResponse;
    }

    return rejectWithValue('Something went wrong...');
  },
);

export const logOut = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'api/logout',
  async function () {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      return response.data;
    } catch (e) {
      return 'Something went wrong. Please, try it again...';
    }
  },
);

export const checkAuth = createAsyncThunk<AuthResponse, undefined, { rejectValue: string }>(
  'api/checkAuth',
  async function () {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (e) {
      return { message: 'Something went wrong. Please, try it again...' } as AuthResponse;
    }
  },
);

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, state => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.error = action.payload.message;
          state.loading = false;
          alert(state.error);
        }

        if (action?.payload?.accessToken !== '') {
          state.login = action.payload.user[0].login;
          state.id = action.payload.user[0].id;
          state.isAuth = true;
          state.error = '';
          state.loading = false;
        }
      })
      .addCase(signIn.pending, state => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.error = action.payload.message;
          state.loading = false;
          alert(state.error);
        }

        if (action?.payload?.accessToken !== '') {
          state.login = action.payload.user[0].login;
          state.id = action.payload.user[0].id;
          state.isAuth = true;
          state.error = '';
          state.loading = false;
        }
      })
      .addCase(logOut.pending, state => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        if (action.payload === 'Something went wron�. Please, try it again later...') {
          state.loading = false;
          alert('Something went wront. Please, try it again...');
        }
        if (action.payload !== 'Something went wront. Please, try it again...') {
          state.login = '';
          state.id = undefined;
          state.isAuth = false;
          state.error = '';
          state.loading = false;
        }
      })
      .addCase(checkAuth.pending, state => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.error = action.payload.message;
          state.loading = false;
          state.login = '';
          state.id = undefined;
          state.isAuth = false;
          alert(state.error);
        }

        if (!action.payload.message) {
          state.login = action.payload.user[0].login;
          state.id = action.payload.user[0].id;
          state.isAuth = true;
          state.error = '';
          state.loading = false;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

// export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
