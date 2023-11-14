'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TextInput } from '@tremor/react';
import { useAuthStore, useChatStore, useUIStore } from '@/stores';
import { PlusIcon, SearchIcon } from '../icons/icons';
import { ProfilePhoto } from './profile-photo';
import { ChatsList } from '../chats/chats-list';
import { Dropdown } from './dropdown';
import { classNames, useOutsideAlerter } from '@/utils';
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
	const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
	const setIsSidebarOpen = useUIStore(state => state.setIsSidebarOpen);

	const closeSidebar = () => {
		if (window.innerWidth > 1024) return;
		setIsSidebarOpen(false);
	};

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, closeSidebar);

	useEffect(() => {
		setChats(chats);
	}, [chats, setChats]);

	useLayoutEffect(() => {
		function updateSize() {
			if (window.innerWidth < 1024) return setIsSidebarOpen(false);
			setIsSidebarOpen(true);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, [setIsSidebarOpen]);

	return (
		<AnimatePresence>
			{isSidebarOpen && (
				<motion.aside
					ref={wrapperRef}
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					exit={{ x: '-100%' }}
					transition={{ duration: window.innerWidth > 1024 ? 0 : 0.3 }}
					className='min-h-screen w-[400px] max-w-[80%] bg-secondary-dk flex flex-col justify-between absolute lg:relative left-0 top-0 z-10'>
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
				</motion.aside>
			)}
		</AnimatePresence>
	);
};
