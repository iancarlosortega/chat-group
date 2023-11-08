'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores';
import { MessagesList } from './messages-list';
import { MessageInput } from './message-input';
import { Message } from '@/interfaces';

interface Props {
	totalMessages: number;
	messages: Message[];
	chatId: string;
}

export const MessagesSection = ({ chatId, messages, totalMessages }: Props) => {
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
		<>
			<section>
				<MessagesList
					messages={newMessages}
					user={user!}
					chatId={chatId}
					totalMessages={totalMessages}
					newMessagesCounter={newMessagesCounter}
					handleNewMessages={onNewMessages}
				/>
			</section>
			<div className='container mx-auto h-[100px] flex items-center p-4 lg:px-16'>
				<MessageInput
					chatId={chatId}
					user={user!}
					handleNewMessage={onNewMessage}
				/>
			</div>
		</>
	);
};
