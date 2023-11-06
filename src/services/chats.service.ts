import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { chatGroupApi } from '@/api/chatGroupApi';
import { CreateChat } from '@/interfaces';

export class ChatsService {
	static getAllChats = async () => {
		try {
			const { data } = await chatGroupApi.get('/chats');
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
				throw new Error(error.response?.data.messsage);
			}
			console.log(error);
			throw new Error('Unable to retrieve all chats');
		}
	};

	static createChat = async (newChat: CreateChat) => {
		try {
			const { data } = await chatGroupApi.post('/chats', newChat);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
				throw new Error(error.response?.data.messsage);
			}
			console.log(error);
			throw new Error('Unable to create chat');
		}
	};
}
