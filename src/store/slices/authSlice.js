import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (_, { getState }) => {
        try {
            const refreshToken = getState().auth.refreshToken;
            const response = await axios.post('http://34.125.245.208/account/api/token/refresh/', { refresh: refreshToken });
            return response.data.access;
        } catch (error) {
            throw error;
        }
    }
);

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (user, { dispatch }) => {
        try {
            const response = await axios.post('http://34.125.245.208/account/api/token/', user);


            dispatch(authSlice.actions.setTokens(response.data.access, response.data.refresh));


            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload;
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.accessToken = null;
                state.refreshToken = null;
            });
    },
});

export const { setTokens, setAccessToken } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;