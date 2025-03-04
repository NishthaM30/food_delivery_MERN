import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addRestaurant, fetchRestaurantDetails, fetchRestaurants } from '../utils/restaurantApi';

// Fetch all restaurants
export const getRestaurants = createAsyncThunk('restaurants/getRestaurants', async () => {
    const response = await fetchRestaurants();
    return response;
});

// Fetch restaurant details by ID
export const getRestaurantDetails = createAsyncThunk('restaurants/getRestaurantDetails', async (id) => {
    const response = await fetchRestaurantDetails(id);
    return response;
});

// Create a new restaurant
export const createRestaurant = createAsyncThunk('restaurants/createRestaurant', async (newRestaurant) => {
    const response = await addRestaurant(newRestaurant);
    return response;
});

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurants: [],
        selectedRestaurant: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Get Restaurants
        builder.addCase(getRestaurants.pending, (state) => {
            state.status = 'loading';
        }).addCase(getRestaurants.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.restaurants = action.payload;
        }).addCase(getRestaurants.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // Get Restaurant Details
        builder.addCase(getRestaurantDetails.pending, (state) => {
            state.status = 'loading';
        }).addCase(getRestaurantDetails.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.selectedRestaurant = action.payload;
        }).addCase(getRestaurantDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // Create a New Restaurant
        builder.addCase(createRestaurant.fulfilled, (state, action) => {
            state.restaurants.push(action.payload);
        });
    }
});

export default restaurantSlice.reducer;
