import axios from 'axios';

export const chatGroupApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});
