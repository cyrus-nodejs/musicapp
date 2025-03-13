// api/axiosConfig.js
import axios from 'axios';
import { getToken } from './storage';
import { getCsrfToken } from './csrftokenconfig'

//Set CSRF token in the default headers
const csrfToken = getCsrfToken();
if (csrfToken) {
  axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
}
//Configure Axios to include credentials (cookies)

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
axios.defaults.withCredentials = true;  // This will send cookies in cross-origin requests

// Intercept requests to attach the token from Redux state
axios.interceptors.request.use(
  (config) => {
    // Get the token from Redux state
    const token = getToken();

    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);






export default axios;
