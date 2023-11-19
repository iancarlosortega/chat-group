'use client';

import { useState } from 'react';
import { socket } from '@/api/websockets';
import { MessagesService } from '@/services';
import { SendMessageIcon } from '../icons/icons';
import { useChatStore } from '@/stores';

export const MessageInput = () => {
	const [inputValue, setInputValue] = useState('');
	const currentChat = useChatStore(state => state.currenChat);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onNewMessage();
		}
	};

	const onNewMessage = async () => {
		if (inputValue.trim().length === 0) return;
		socket.emit('send_message', {
			message: inputValue,
			roomId: currentChat?.id,
		});
		setInputValue('');
		try {
			await MessagesService.createMessage({
				content: inputValue,
				chatId: currentChat!.id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex items-center gap-2 p-2 bg-secondary-lt rounded-lg w-full'>
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
