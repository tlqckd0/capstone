//const apiKey = require('../config/openweather_key');
const axios = require('axios');

const API_URL = (lat, lon, key) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
};

const weather_API = async (latitude, longtitude) => {
    try {
        const url = API_URL(latitude, longtitude, process.env.WEATHER_API_KEY);
        return await axios.get(url);
    } catch (err) {
        console.error(err);
    }
};

module.exports = weather_API;
