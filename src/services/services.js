import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
});

// TODO: Add interceptor for token

export default service;
