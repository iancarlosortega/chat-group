'use client';

import { useChatStore, useUIStore } from '@/stores';
import { MenuIcon } from '../icons/icons';

interface Props {
	chatName?: string;
}

export const ChatHeader = ({ chatName }: Props) => {
	const setIsSidebarOpen = useUIStore(state => state.setIsSidebarOpen);
	const currentChat = useChatStore(state => state.currenChat);

	return (
		<header className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
			<div className='container mx-auto px-4 lg:px-12 xl:px-16 h-[65px] flex items-center gap-4'>
				<button className='lg:hidden' onClick={() => setIsSidebarOpen(true)}>
					<MenuIcon className='w-6 h-6 text-white stroke-2' />
				</button>
				<p className='uppercase text-white font-bold text-lg container mx-auto'>
					{chatName ?? currentChat?.name}
				</p>
			</div>
		</header>
	);
};
