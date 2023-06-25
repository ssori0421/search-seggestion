import axios from 'axios';

const defaultConfig = {
  baseURL: `/api`,
  Headers: { 'Content-Type': 'application/json' },
};

const instance = axios.create(defaultConfig);

export default instance;
