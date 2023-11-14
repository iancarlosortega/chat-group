'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores';
import { MessagesList } from './messages-list';
import { MessageInput } from './message-input';
import { Message } from '@/interfaces';

interface Props {
	messages: Message[];
	chatId: string;
}

export const MessagesSection = ({ chatId, messages }: Props) => {
	const [newMessages, setNewMessages] = useState(messages);
	const [newMessagesCounter, setNewMessagesCounter] = useState(0);
	const user = useAuthStore(state => state.user);

	const onNewMessage = (newMessage: Message) => {
		setNewMessagesCounter(prev => prev + 1);
		setNewMessages(prev => [newMessage, ...prev]);
	};

	const onNewMessages = (newMessages: Message[]) => {
		setNewMessages(prev => [...prev, ...newMessages]);
	};

	return (
		<section className='container mx-auto px-4 xl:px-16'>
			<MessagesList
				messages={newMessages}
				user={user!}
				chatId={chatId}
				newMessagesCounter={newMessagesCounter}
				handleNewMessages={onNewMessages}
			/>
			<div className='h-[100px] flex items-center'>
				<MessageInput
					chatId={chatId}
					user={user!}
					handleNewMessage={onNewMessage}
				/>
			</div>
		</section>
	);
};
