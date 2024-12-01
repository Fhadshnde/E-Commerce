import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const getToken = () => {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (persistRoot) {
      const user = JSON.parse(persistRoot).user;
      if (user) {
        const currentUser = JSON.parse(user).currentUser;
        if (currentUser && currentUser.accessToken) {
          return currentUser.accessToken;
        }
      }
    }
  } catch (error) {
    console.error("Error retrieving accessToken:", error);
  }
  return null;
};

const TOKEN = getToken();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN ? `Bearer ${TOKEN}` : "" },
});
