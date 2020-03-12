import axios from 'axios'

const serverPrefix = 'http://localhost:4000/'
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const login = async (username, password) => {
    try {
        const result = await axios.post(`${serverPrefix}auth/login`, { username, password });
        if (result?.data?.access_token) {
            return result.data.access_token;
        } else {
            throw new Error("Login failed");
        }
    } catch (error) {
        throw error;
    }
}

export const getMockCargo = async () => {
    try {
        const result = await axios.post(`${serverPrefix}cargo/mock`);
        if (result?.data) {
            return result.data;
        } else {
            throw new Error("Failed to get mock cargo");
        }
    } catch (error) {
        throw error;
    }
}

