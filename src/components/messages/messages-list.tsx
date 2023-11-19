'use client';

import { useEffect, useRef, useState } from 'react';
import { socket } from '@/api/websockets';
import { MessagesService } from '@/services';
import { useAuthStore, useChatStore } from '@/stores';
import { ProfilePhoto } from '../UI/profile-photo';
import { InfiniteScroll } from '../UI/infinite-scroll';
import { formatDate } from '@/utils';
import { Message } from '@/interfaces';

export const MessagesList = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessagesCounter, setNewMessagesCounter] = useState(0);
	const [page, setPage] = useState(0);
	const user = useAuthStore(state => state.user);
	const currentChat = useChatStore(state => state.currenChat);
	const bottomRef = useRef<HTMLDivElement>(null);

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
			<div className='h-full overflow-y-auto flex flex-col-reverse items-end scroll-container p-4 lg:px-16 relative'>
				{messages.map(message => (
					<div
						key={message.id}
						className={`w-full flex gap-4 mt-4 ${
							user?.id === message.user.id && 'flex-row-reverse'
						}`}>
						{user?.id !== message.user.id && (
							<div className='w-10'>
								<ProfilePhoto user={message.user} />
							</div>
						)}
						<div className='flex-1'>
							<div
								className={`flex flex-col gap-2 ${
									user?.id === message.user.id ? 'items-end' : 'items-start'
								}`}>
								{user?.id !== message.user.id && (
									<p className='font-bold text-tertiary-dk'>
										{message.user.fullName}
									</p>
								)}
								<p
									className={`text-white bg-secondary-dk px-4 py-2 rounded-xl ${
										user?.id === message.user.id ? '' : 'rounded-tl-none'
									}`}>
									{message.content}
								</p>
								<p className='text-xs font-medium text-tertiary-dk '>
									{formatDate(message.createdAt)}
								</p>
							</div>
						</div>
					</div>
				))}
				<InfiniteScroll fetchData={fetchMoreMessages} />
			</div>
			<div ref={bottomRef}></div>
		</div>
	);
};
