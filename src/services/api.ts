import axios from 'axios';

export const apiAuth = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL_SIGN_IN,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiFipe = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL_FIPE_CARS,
});
