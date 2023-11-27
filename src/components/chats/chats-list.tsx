'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatsService } from '@/services';
import { useChatStore } from '@/stores';
import { ChatsListItem } from './chats-list-item';
import { InfiniteScroll } from '../UI/infinite-scroll';
import { LoadingSpinnerIcon } from '../icons/icons';
import { Chat } from '@/interfaces';

export const ChatsList = () => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const chatListRef = useRef<HTMLUListElement>(null);
	const newChatsCounter = useChatStore(state => state.newChatsCounter);
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get('query') ?? '';

	const fetchMoreChats = async () => {
		const limit = 10;
		const offset = page * limit + newChatsCounter;
		const { result } = await ChatsService.getChatsByTerm(
			searchTerm,
			limit,
			offset
		);
		setChats(prev => [...prev, ...result]);
		setPage(prev => prev + 1);
		return result.length > 0;
	};

	useEffect(() => {
		console.log('LoadChats');
		setIsLoading(true);
		const loadChats = async () => {
			const { result } = await ChatsService.getChatsByTerm(searchTerm);
			setChats(result);
			setPage(1);
			setIsLoading(false);
		};
		loadChats();
	}, [searchTerm]);

	return (
		<>
			{isLoading ? (
				<div className='flex-1 flex justify-center items-center'>
					<LoadingSpinnerIcon />
				</div>
			) : (
				<ul
					ref={chatListRef}
					className='my-4 flex-1 overflow-y-auto scroll-container'>
					{chats.map(chat => (
						<ChatsListItem key={chat.id} chat={chat} />
					))}
					<InfiniteScroll
						root={chatListRef?.current as HTMLElement}
						rootMargin='100px'
						fetchData={fetchMoreChats}
					/>
				</ul>
			)}
		</>
	);
};
