import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { useUIStore } from '@/stores';
import { classNames } from '@/utils';

interface IFormValues {
	name: string;
	description?: string;
}

export const CreateChatGroupModal = () => {
	const isOpen = useUIStore(state => state.isCreateChatModalOpen);
	const setIsCreateChatModalOpen = useUIStore(
		state => state.setIsCreateChatModalOpen
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = ({ name, description }: IFormValues) => {
		console.log({ name, description });
		// TODO: Call API to create new chat
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => setIsCreateChatModalOpen(false)}>
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
							<Dialog.Panel className='w-[600px] rounded-2xl bg-secondary-dk p-6 shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-bold uppercase leading-6 text-white'>
									New Channel
								</Dialog.Title>
								<form
									className='mt-4 mb-2'
									autoComplete='off'
									onSubmit={handleSubmit(onSubmit)}>
									<div>
										<input
											type='text'
											placeholder='Channel name'
											className={classNames(
												'bg-secondary-lt rounded-lg w-full px-4 py-3 my-2',
												'placeholder:text-tertiary-dk text-white outline-none',
												`${
													errors.name &&
													'outline outline-red-400 placeholder:text-red-400'
												}`
											)}
											{...register('name', {
												required: 'Name is required',
												minLength: {
													value: 3,
													message: 'Must be at least 3 characters!',
												},
											})}
										/>
										{errors.name && (
											<span className='text-red-500 text-sm'>
												{errors.name.message}
											</span>
										)}
									</div>
									<textarea
										rows={3}
										placeholder='Channel Description'
										className={classNames(
											'bg-secondary-lt rounded-lg w-full px-4 py-3 my-2 resize-none',
											'placeholder:text-tertiary-dk text-white outline-none'
										)}
										{...register('description')}></textarea>

									<div className='flex justify-end'>
										<button
											type='submit'
											className={classNames(
												'bg-blue-500 text-white rounded-lg px-6 py-2',
												'hover:bg-blue-600 transition-colors duration-200 ease-in',
												'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											)}>
											Save
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
