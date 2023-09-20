import axios from 'axios';

export default axios.create({
    //baseURL: 'http://localhost:5000',
    baseURL: 'https://jitter-backend.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});