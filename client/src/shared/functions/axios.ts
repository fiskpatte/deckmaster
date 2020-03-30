import axios from 'axios';

export const setAuthorizationToken = (token?: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('jwtToken', token)
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('jwtToken');
    }
}
