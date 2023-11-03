import { AxiosError } from 'axios';
import { chatGroupApi } from '@/api/chatGroupApi';
import { User } from '@/interfaces';
import { toast } from 'sonner';

export class AuthService {
	static login = async (
		email: string,
		password: string
	): Promise<{ user: User; token: string }> => {
		try {
			const { data } = await chatGroupApi.post('/auth/login', {
				email,
				password,
			});

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
				throw new Error(error.response?.data.messsage);
			}
			console.log(error);
			throw new Error('Unable to login');
		}
	};
}
