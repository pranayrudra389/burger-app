import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-1f02f.firebaseio.com/'
});

export default instance;