'use client';

import { useEffect } from 'react';
import { TextInput } from '@tremor/react';
import { useAuthStore, useChatStore, useUIStore } from '@/stores';
import { PlusIcon, SearchIcon } from '../icons/icons';
import { ProfilePhoto } from './profile-photo';
import { ChatsList } from '../chats/chats-list';
import { Dropdown } from './dropdown';
import { classNames } from '@/utils';
import { Chat } from '@/interfaces';

interface Props {
	chats: Chat[];
}

export const Sidebar: React.FC<Props> = ({ chats }) => {
	const user = useAuthStore(state => state.user);
	const setChats = useChatStore(state => state.setChats);
	const setIsCreateChatModalOpen = useUIStore(
		state => state.setIsCreateChatModalOpen
	);

	useEffect(() => {
		setChats(chats);
	}, [chats, setChats]);

	return (
		<aside className='min-h-screen w-[400px] bg-secondary-dk flex flex-col justify-between'>
			<div className='flex-1 text-white'>
				<header className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 flex items-center justify-between h-[65px]'>
					<p className='font-bold text-lg'>Channels</p>
					<button
						className='bg-secondary p-2 rounded-lg'
						onClick={() => setIsCreateChatModalOpen(true)}>
						<PlusIcon className='stroke-2' />
					</button>
				</header>
				<div className='p-4 h-[calc(100vh-165px)] flex flex-col'>
					<TextInput
						icon={SearchIcon}
						type='text'
						placeholder='Search'
						className={classNames(
							'bg-secondary-lt rounded-lg outline-none border-none p-2'
						)}
					/>
					<ChatsList />
				</div>
			</div>
			<footer className='bg-secondary-dks flex items-center justify-between h-[100px] p-4'>
				<div className='flex items-center gap-3'>
					{user && <ProfilePhoto user={user} />}
					<p className='font-bold text-tertiary-dk'>{user?.fullName}</p>
				</div>
				<Dropdown />
			</footer>
		</aside>
	);
};
