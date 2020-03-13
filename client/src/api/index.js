import axios from 'axios'
import jwt_decode from 'jwt-decode';
import {setAuthorizationToken} from '../shared/functions/axios'
const serverPrefix = 'http://localhost:4000/'
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const login = async (username, password) => {
    try {
        const result = await axios.post(`${serverPrefix}auth/login`, {username, password});
        if(result?.data?.access_token){
            const token = result.data.access_token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token)

            const decodedToken = jwt_decode(token);
            console.log("expiration date: ", new Date(decodedToken.exp * 1000))
            return token;
        } else {
            throw new Error("Login failed");
        }
    } catch(error){
        throw error;
    }
}

