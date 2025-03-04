import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/users';

export const loginUser = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/login`);
        return response.data;
    } catch (error) {
        throw error;
    }
}