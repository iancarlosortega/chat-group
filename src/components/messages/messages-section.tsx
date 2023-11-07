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
	const user = useAuthStore(state => state.user);

	const onNewMessage = (newMessage: Message) => {
		setNewMessages(prev => [newMessage, ...prev]);
	};

	return (
		<>
			<section>
				<MessagesList messages={newMessages} user={user!} />
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
