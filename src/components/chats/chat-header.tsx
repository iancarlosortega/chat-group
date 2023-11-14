'use client';

import { useUIStore } from '@/stores';
import { MenuIcon } from '../icons/icons';

interface Props {
	name: string;
}

export const ChatHeader: React.FC<Props> = ({ name }) => {
	const setIsSidebarOpen = useUIStore(state => state.setIsSidebarOpen);

	return (
		<header className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
			<div className='container mx-auto px-4 xl:px-16 h-[65px] flex items-center gap-4'>
				<button className='lg:hidden' onClick={() => setIsSidebarOpen(true)}>
					<MenuIcon className='w-6 h-6 text-white stroke-2' />
				</button>
				<p className='uppercase text-white font-bold text-lg container mx-auto'>
					{name}
				</p>
			</div>
		</header>
	);
};
