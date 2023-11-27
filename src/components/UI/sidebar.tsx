'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useAuthStore, useUIStore } from '@/stores';
import { PlusIcon } from '../icons/icons';
import { ProfilePhoto } from './profile-photo';
import { SearchChatInput } from '../chats/search-chat-input';
import { ChatsList } from '../chats/chats-list';
import { Dropdown } from './dropdown';
import { useOutsideAlerter } from '@/utils';

export const Sidebar = () => {
	const [width, setWidth] = useState(0);
	const user = useAuthStore(state => state.user);
	const setIsCreateChatModalOpen = useUIStore(
		state => state.setIsCreateChatModalOpen
	);
	const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
	const setIsSidebarOpen = useUIStore(state => state.setIsSidebarOpen);

	useLayoutEffect(() => {
		function updateSize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const closeSidebar = () => {
		if (width > 1024) return;
		setIsSidebarOpen(false);
	};

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, closeSidebar);

	return (
		<aside
			ref={wrapperRef}
			className={`min-h-screen w-[400px] max-w-[80%] bg-secondary-dk flex flex-col justify-between absolute lg:relative left-0 top-0 z-30 transition-transform ease duration-300 ${
				isSidebarOpen || width > 1024 ? 'translate-x-0' : 'translate-x-[-100%]'
			}`}>
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
					<SearchChatInput />
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
