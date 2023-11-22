'use client';

import { useState } from 'react';
import { ChatsService } from '@/services';
import { ChatsListItem } from './chats-list-item';
import { InfiniteScroll } from '../UI/infinite-scroll';
import { useChatStore } from '@/stores';

export const ChatsList = () => {
	const chats = useChatStore(state => state.chats);
	const addChats = useChatStore(state => state.addChats);
	const newChatsCounter = useChatStore(state => state.newChatsCounter);

	const [page, setPage] = useState(1);

	const fetchMoreChats = async () => {
		const limit = 10;
		const offset = page * limit + newChatsCounter;
		const response = await ChatsService.getAllChats(limit, offset);

		addChats(response.result);
		setPage(prev => prev + 1);

		return response.result.length > 0;
	};

	return (
		<ul className='my-2 py-2 md:py-4 flex-1 overflow-y-auto scroll-container'>
			{chats.map(chat => (
				<ChatsListItem key={chat.id} chat={chat} />
			))}
			<InfiniteScroll fetchData={fetchMoreChats} />
		</ul>
	);
};
