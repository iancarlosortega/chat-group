'use client';

import Link from 'next/link';
import { InitialsName } from '../UI/initials-name';
import { Chat } from '@/interfaces';
import { useUIStore } from '@/stores';

interface Props {
	chat: Chat;
}

export const ChatsListItem: React.FC<Props> = ({ chat }) => {
	const setIsChatInformationOpen = useUIStore(
		state => state.setIsChatInformationOpen
	);

	const handleOpenChat = () => {
		setIsChatInformationOpen(true);
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
