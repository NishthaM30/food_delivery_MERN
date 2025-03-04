import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/menu';

export const fetchMenuItems = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu items:', error.response ? error.response.data : error.message);
        throw error;
    }
}
