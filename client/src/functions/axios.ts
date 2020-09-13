import axios from "axios";
import { SessionData } from './../types/sessionData';

export const setDefaultHeader = (name: string, value: string) => {
  axios.defaults.headers.common[name] = value;
}

export const removeDefaultHeader = (name: string) => {
  delete axios.defaults.headers.common[name];
}

export const removeAllDefaultHeaders = () => {
  removeDefaultHeader("Authorization");
  removeDefaultHeader("username");
  removeDefaultHeader("voyageId");
  removeDefaultHeader("vesselId");
}

export const setAllDefaultHeaders = (data: SessionData) => {
  setDefaultHeader("Authorization", `Bearer ${data.accessToken}`);
  setDefaultHeader("username", data.username);
  setDefaultHeader("voyageId", data.voyageId);
  setDefaultHeader("vesselId", data.vesselId);
}

// export const setAuthorizationToken = (token?: string) => {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     localStorage.setItem("jwtToken", token);
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//     localStorage.removeItem("jwtToken");
//   }
// };

// export const setUsername = (username?: string) => {
//   if (username) {
//     axios.defaults.headers.common["username"] = username;
//     localStorage.setItem("username", username);
//   } else {
//     delete axios.defaults.headers.common["username"];
//     localStorage.removeItem("username");
//   }
// };
