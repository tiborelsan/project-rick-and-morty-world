import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

//Response interceptor
instance.interceptors.response.use(
    function (response) {
        return response.data;
    }, async function (error) {
        if (error.response != undefined) {
            console.log('Error status:', error.response.status, 'url:', (error.config.baseURL + error.config.url), 'message:', error.response.data);
        }
        else {
            console.log('Error message:', error.message);
        }

        return Promise.reject(error);
    }
);

export default instance;