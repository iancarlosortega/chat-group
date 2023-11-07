'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SendMessageIcon } from '../icons/icons';
import { MessagesService } from '@/services';
import { Message, User } from '@/interfaces';

interface Props {
	chatId: string;
	user: User;
	handleNewMessage: (messsage: Message) => void;
}

export const MessageInput: React.FC<Props> = ({
	chatId,
	user,
	handleNewMessage,
}) => {
	const [inputValue, setInputValue] = useState('');

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onNewMessage();
		}
	};

	const onNewMessage = async () => {
		if (inputValue.trim().length === 0) return;
		const newMessage: Message = {
			id: uuidv4(),
			content: inputValue,
			user,
			createdAt: new Date() as any,
			updatedAt: new Date() as any,
		};
		handleNewMessage(newMessage); // Optimistic update
		try {
			await MessagesService.createMessage({
				content: inputValue,
				chatId,
			});
			setInputValue('');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex items-center gap-2 p-2 bg-secondary-lt rounded-lg w-full mb-8 '>
			<input
				className='pl-4 border-none outline-none w-full bg-transparent text-white caret-blue-500'
				type='text'
				placeholder='Type a message here'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
			<button
				onClick={onNewMessage}
				className='bg-blue-500 p-2 rounded-lg text-white'>
				<SendMessageIcon className='stroke-2' />
			</button>
		</div>
	);
};
