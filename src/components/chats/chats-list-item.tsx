'use client';

import Link from 'next/link';
import { socket } from '@/api/websockets';
import { useChatStore, useUIStore } from '@/stores';
import { InitialsName } from '../UI/initials-name';
import { Chat } from '@/interfaces';

interface Props {
	chat: Chat;
}

export const ChatsListItem: React.FC<Props> = ({ chat }) => {
	const currentChat = useChatStore(state => state.currenChat);
	const setIsSidebarOpen = useUIStore(state => state.setIsSidebarOpen);

	const handleJoinRoom = () => {
		setIsSidebarOpen(false);
		if (currentChat?.id === chat.id) return;
		socket.emit('leave_room', currentChat?.id);
		socket.emit('join_room', chat.id);
	};

	return (
		<li className='mb-4 flex items-center gap-4'>
			<InitialsName name={chat.name} />
			<Link
				href={chat.id}
				onClick={handleJoinRoom}
				className='uppercase text-[#BDBDBD] font-bold'>
				{chat.name}
			</Link>
		</li>
	);
};
