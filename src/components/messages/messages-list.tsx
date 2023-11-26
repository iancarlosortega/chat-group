'use client';

import { useEffect, useRef, useState } from 'react';
import { socket } from '@/api/websockets';
import { MessagesService } from '@/services';
import { useAuthStore, useChatStore } from '@/stores';
import { InfiniteScroll } from '../UI/infinite-scroll';
import { OwnerMessage } from './owner-message';
import { GuestMessage } from './guest-message';
import { Message } from '@/interfaces';

export const MessagesList = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessagesCounter, setNewMessagesCounter] = useState(0);
	const [page, setPage] = useState(0);
	const user = useAuthStore(state => state.user);
	const currentChat = useChatStore(state => state.currenChat);
	const bottomRef = useRef<HTMLDivElement>(null);
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		socket.on('receive_message', (newMessage: Message) => {
			setNewMessagesCounter(prev => prev + 1);
			setMessages(prev => [newMessage, ...prev]);
		});

		socket.connect();

		return () => {
			socket.off('connect');
			socket.off('receive_message');
		};
	}, []);

	const fetchMoreMessages = async () => {
		const limit = 10;
		const { result: messages } = await MessagesService.getMessagesByChatId({
			chatId: currentChat!.id,
			limit,
			offset: page * limit + newMessagesCounter,
		});

		setMessages(prev => [...prev, ...messages]);
		setPage(prev => prev + 1);

		return messages.length > 0;
	};

	useEffect(() => {
		if (bottomRef.current)
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div className='h-[calc(100vh-165px)]'>
			<div
				ref={messagesContainerRef}
				className='h-full overflow-y-auto flex flex-col-reverse items-end scroll-container px-4 pt-2 lg:px-12 xl:px-16 relative'>
				{messages.map(message => {
					if (user?.id === message.user.id) {
						return (
							<OwnerMessage
								key={message.id}
								message={message}
								messages={messages}
							/>
						);
					} else {
						return (
							<GuestMessage
								key={message.id}
								message={message}
								messages={messages}
							/>
						);
					}
				})}
				<InfiniteScroll
					root={messagesContainerRef.current as HTMLElement}
					rootMargin='200px'
					fetchData={fetchMoreMessages}
				/>
			</div>
			<div ref={bottomRef}></div>
		</div>
	);
};
