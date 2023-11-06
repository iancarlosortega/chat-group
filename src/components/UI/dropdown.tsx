import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { useUIStore } from '@/stores';
import { ArrowDownIcon, LogoutIcon, ProfileIcon } from '../icons/icons';

export const Dropdown = () => {
	const setIsConfirmLogoutModalOpen = useUIStore(
		state => state.setIsConfirmLogoutModalOpen
	);

	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button>
					<ArrowDownIcon
						className='text-gray-400 stroke-2'
						aria-hidden='true'
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'>
				<Menu.Items className='absolute right-0 top-[-150px] mt-2 w-64 p-2 rounded-md bg-secondary border border-secondary-lt shadow-lg focus:outline-none'>
					<Menu.Item>
						<Link
							href='/profile'
							className='text-[#E0E0E0] hover:bg-secondary-lt transition-colors ease-in rounded-md flex items-center gap-4 p-3 my-2'>
							<ProfileIcon />
							My Profile
						</Link>
					</Menu.Item>
					<Menu.Item>
						<button
							onClick={() => setIsConfirmLogoutModalOpen(true)}
							className='text-red-500 hover:text-red-700 hover:bg-secondary-lt w-full rounded-md transition-colors flex items-center gap-4 p-3'>
							<LogoutIcon />
							Logout
						</button>
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
