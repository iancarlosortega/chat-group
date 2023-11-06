import axios from 'axios';
import { getCookie } from 'cookies-next';

export const chatGroupApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

chatGroupApi.interceptors.request.use(config => {
	const token = getCookie('token');

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});
