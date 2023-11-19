import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';

export const socket = io(
	process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000',
	{
		autoConnect: false,
		extraHeaders: {
			authorization: `Bearer ${getCookie('token')}`,
		},
	}
);
