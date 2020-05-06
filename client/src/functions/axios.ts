import axios from "axios";

export const setDefaultHeader = (name: string, value: string) => {
  axios.defaults.headers.common[name] = value;
}

export const removeDefaultHeader = (name: string) => {
  delete axios.defaults.headers.common[name];
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
