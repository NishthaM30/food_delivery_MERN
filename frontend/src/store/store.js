import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import restaurantReducer from '../features/restaurantSlice';
import menuReducer from '../features/menuSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurants: restaurantReducer,
        menu: menuReducer
    }
})