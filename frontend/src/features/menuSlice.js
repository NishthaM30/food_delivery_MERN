// menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuItems } from '../utils/menuApi';

export const getMenuItems = createAsyncThunk('menu/getMenuItems', async (restaurantId) => {
    const response = await fetchMenuItems(restaurantId);
    return response;
});

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenuItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMenuItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload
            })
            .addCase(getMenuItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default menuSlice.reducer;
