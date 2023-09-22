import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    //baseURL: 'https://quilled-viridian-tempo.glitch.me',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});