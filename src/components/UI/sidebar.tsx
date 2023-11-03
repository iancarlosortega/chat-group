'use client';

import { TextInput } from '@tremor/react';
import { ArrowDownIcon, PlusIcon, SearchIcon } from '../icons/icons';
import { ProfilePhoto } from './profile-photo';
import { useAuthStore } from '@/stores';
import { classNames } from '@/utils';

export const Sidebar = () => {
	const user = useAuthStore(state => state.user);

	return (
		<aside className='min-h-screen w-[400px] bg-secondary-dk flex flex-col justify-between'>
			<div className='flex-1 text-white'>
				<header className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 flex items-center justify-between'>
					<p className='font-bold text-lg'>Channels</p>
					<button className='bg-secondary p-2 rounded-lg'>
						<PlusIcon className='stroke-2' />
					</button>
				</header>
				<div className='p-4'>
					<TextInput
						icon={SearchIcon}
						type='text'
						placeholder='Search'
						className={classNames(
							'bg-secondary-lt rounded-lg outline-none border-none p-2'
						)}
					/>
					{/* TODO: Channels List */}
				</div>
			</div>
			<footer className='bg-secondary-dks flex items-center justify-between h-[100px] p-4'>
				<div className='flex items-center gap-3'>
					<ProfilePhoto user={user!} />
					<p className='font-bold text-tertiary-dk'>{user?.fullName}</p>
				</div>
				<button>
					<ArrowDownIcon className='text-gray-400 stroke-2' />
				</button>
			</footer>
		</aside>
	);
};
