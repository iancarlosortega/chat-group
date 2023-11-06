import { User } from '.';

export interface CreateMessage {
	content: string;
	chatId: string;
}

export interface Message {
	id: string;
	content: string;
	user: User;
	createdAt: Date;
	updatedAt: Date;
}
