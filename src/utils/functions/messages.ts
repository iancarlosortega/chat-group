import { Message } from '@/interfaces';

export const checkNextMessage = (message: Message, messages: Message[]) => {
	const index = messages.findIndex(m => m.id === message.id);
	const nextMessage = messages[index + 1];
	return message.user.id === nextMessage?.user.id;
};

export const checkPreviousMessage = (message: Message, messages: Message[]) => {
	const index = messages.findIndex(m => m.id === message.id);
	const previousMessage = messages[index - 1];
	return message.user.id === previousMessage?.user.id;
};
