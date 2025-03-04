import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/restaurants';

export const fetchRestaurants = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get_restaurants`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchRestaurantDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/get_restaurant_details/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addRestaurant = async (newRestaurant) => {
    try {
        const response = await axios.post(BASE_URL, newRestaurant);
        return response.data;
    } catch (error) {
        throw error;
    }
}