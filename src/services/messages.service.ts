import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { chatGroupApi } from '@/api/chatGroupApi';
import { CreateMessage, Message } from '@/interfaces';

export class MessagesService {
	static getMessagesByChatId = async ({
		chatId,
		limit = 10,
		offset = 0,
	}: {
		chatId: string;
		limit?: number;
		offset?: number;
	}): Promise<{
		result: Message[];
		totalItems: number;
	}> => {
		try {
			const { data } = await chatGroupApi.get<{
				result: Message[];
				totalItems: number;
			}>(`/messages/${chatId}`, {
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

	static createMessage = async (newMessage: CreateMessage) => {
		try {
			const { data } = await chatGroupApi.post('/messages', newMessage);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
				throw new Error(error.response?.data.messsage);
			}
			console.log(error);
			throw new Error('Unable to create message');
		}
	};
}
