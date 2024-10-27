import axios, { CreateAxiosDefaults } from 'axios';

const baseURL = 'http://localhost:3000';
const baseConfig: CreateAxiosDefaults = {
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const apiClient = axios.create(baseConfig);