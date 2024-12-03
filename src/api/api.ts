import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (
  city: string,
  unit: 'metric' | 'imperial'
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherByLocation = async (
  lat: number,
  lon: number,
  unit: 'metric' | 'imperial'
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
