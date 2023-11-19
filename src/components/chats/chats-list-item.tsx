'use client';

import Link from 'next/link';
import { InitialsName } from '../UI/initials-name';
import { Chat } from '@/interfaces';
import { useChatStore, useUIStore } from '@/stores';
import { socket } from '@/api/websockets';

interface Props {
	chat: Chat;
}

export const ChatsListItem: React.FC<Props> = ({ chat }) => {
	const setIsChatInformationOpen = useUIStore(
		state => state.setIsChatInformationOpen
	);
	const currentChat = useChatStore(state => state.currenChat);

	const handleOpenChat = () => {
		socket.emit('leave_room', currentChat?.id);
		socket.emit('join_room', chat.id);
		// setIsChatInformationOpen(true);
	};

	return (
		<li className='my-4 flex items-center gap-4'>
			<InitialsName name={chat.name} />
			<Link
				href={chat.id}
				onClick={handleOpenChat}
				className='uppercase text-[#BDBDBD] font-bold'>
				{chat.name}
			</Link>
		</li>
	);
};
