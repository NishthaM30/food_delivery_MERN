import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerFailure,
    registerSuccess,
    registerStart,
    logout
} = userSlice.actions;

export default userSlice.reducer;