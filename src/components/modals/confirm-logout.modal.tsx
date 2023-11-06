import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { useAuthStore, useUIStore } from '@/stores';

export const ConfirmLogoutModal = () => {
	const isOpen = useUIStore(state => state.isConfirmLogoutModalOpen);
	const setIsConfirmLogoutModalOpen = useUIStore(
		state => state.setIsConfirmLogoutModalOpen
	);
	const logout = useAuthStore(state => state.logoutUser);
	const router = useRouter();

	const confirmLogout = () => {
		logout();
		setIsConfirmLogoutModalOpen(false);
		router.push('/login');
	};

	const cancelLogout = () => {
		setIsConfirmLogoutModalOpen(false);
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => setIsConfirmLogoutModalOpen(false)}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black/50' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-[400px] rounded-2xl bg-secondary-dk p-6 shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-white'>
									Are you sure you want to logout?
								</Dialog.Title>
								<div className='flex items-center justify-end gap-4 mt-6'>
									<button
										className='px-4 py-2 rounded-lg bg-gradient-to-br from-neutral-700/80 to bg-neutral-800/80 transition-colors text-white'
										onClick={cancelLogout}>
										Cancel
									</button>
									<button
										className='px-4 py-2 rounded-lg bg-gradient-to-br from-primary/80 to bg-red-800/80 text-white'
										onClick={confirmLogout}>
										Confirm
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
