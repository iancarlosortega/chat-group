'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ProfilePhoto } from '../UI/profile-photo';
import { MessagesService } from '@/services';
import { formatDate } from '@/utils';
import { Message, User } from '@/interfaces';
import { LoadingSpinner } from '../UI/loading-spinner';

interface Props {
	totalMessages: number;
	messages: Message[];
	user: User;
	chatId: string;
	newMessagesCounter: number;
	handleNewMessages: (messages: Message[]) => void;
}

export const MessagesList: React.FC<Props> = ({
	messages,
	user,
	chatId,
	totalMessages,
	newMessagesCounter,
	handleNewMessages,
}) => {
	const [hasMoreMessages, setHasMoreMessages] = useState(
		messages.length < totalMessages
	);
	const [page, setPage] = useState(1);
	const bottomRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef(null);

	const fetchMoreMessages = useCallback(async () => {
		const limit = 10;
		const response = await MessagesService.getMessagesByChatId({
			chatId,
			limit,
			offset: page * limit + newMessagesCounter,
		});
		if (response.result.length === 0) return setHasMoreMessages(false);

		handleNewMessages(response.result);
		setPage(prev => prev + 1);
	}, [chatId, page, handleNewMessages, newMessagesCounter]);

	const onIntersection = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const firstEntry = entries[0];
			if (firstEntry.isIntersecting && hasMoreMessages) {
				fetchMoreMessages();
			}
		},
		[hasMoreMessages, fetchMoreMessages]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(onIntersection);
		if (observer && scrollRef.current) {
			observer.observe(scrollRef.current);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [onIntersection]);

	useEffect(() => {
		if (bottomRef.current)
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div className='h-[calc(100vh-165px)]'>
			<div className='h-full overflow-y-auto flex flex-col-reverse items-end messages-container p-4 lg:px-16 relative'>
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
				{hasMoreMessages && (
					<div className='w-full flex justify-center' ref={scrollRef}>
						<LoadingSpinner />
					</div>
				)}
			</div>
			<div ref={bottomRef}></div>
		</div>
	);
};
