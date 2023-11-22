import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { chatGroupApi } from '@/api/chatGroupApi';
import { Chat, CreateChat } from '@/interfaces';

export class ChatsService {
	static getAllChats = async (
		limit = 10,
		offset = 0
	): Promise<{
		result: Chat[];
		totalItems: number;
	}> => {
		try {
			const { data } = await chatGroupApi.get<{
				result: Chat[];
				totalItems: number;
			}>('/chats', {
				params: {
					limit,
					offset,
				},
			});
			return data;
		} catch (error) {
			return {
				totalItems: 0,
				result: [],
			};
		}
	};

	static getChatById = async (id: string): Promise<Chat | null> => {
		try {
			const { data } = await chatGroupApi.get(`/chats/${id}`);
			return data;
		} catch (error) {
			return null;
		}
	};

	static getChatsByTerm = async (
		term: string,
		limit = 10,
		offset = 0
	): Promise<{
		result: Chat[];
		totalItems: number;
	}> => {
		try {
			const { data } = await chatGroupApi.get('/chats/search', {
				params: {
					term,
					limit,
					offset,
				},
			});
			return data;
		} catch (error) {
			return {
				totalItems: 0,
				result: [],
			};
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
