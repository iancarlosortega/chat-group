'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { FilesService } from '@/services';
import { useAuthStore } from '@/stores';
import { LoadingSpinnerIcon, UploadIcon } from '../icons/icons';
import { classNames } from '@/utils';

export const UploadProfilePhoto = () => {
	const [isUploadingFile, setIsUploadingFile] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const user = useAuthStore(state => state.user);
	const setUser = useAuthStore(state => state.setUser);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isUploadingFile) return;

		const selectedFiles = e.target.files || [];
		const file = selectedFiles[0];

		if (!file) return;

		if (!file.type.includes('image/')) {
			toast.error(
				`File '${file.name}' has no image format and won't be uploaded.`
			);
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			toast.error(
				`File '${file.name}' exceeds the 5MB limit and won't be uploaded.`
			);
			return;
		}

		setIsUploadingFile(true);

		try {
			const data = await FilesService.uploadUserAvatar(file);
			setUser(data);
			toast.success(`File '${file.name}' uploaded successfully.`);
		} catch (error) {
			console.log(error);
		}

		setIsUploadingFile(false);
	};

	return (
		<div className='flex justify-center'>
			<div className='relative'>
				<Image
					src={user?.avatarUrl ?? '/images/no-profile-image.webp'}
					alt='No profile image'
					width={200}
					height={200}
					className='rounded-full w-48 h-48 aspect-square object-cover'
				/>
				{isUploadingFile && (
					<div className='absolute top-0 left-0 z-10 bg-zinc-900/50 rounded-full w-full h-full flex justify-center items-center'>
						<LoadingSpinnerIcon />
					</div>
				)}
				<button
					disabled={isUploadingFile}
					onClick={() => inputRef.current?.click()}
					className={classNames(
						'bg-secondary-dks text-white p-3 rounded-full absolute bottom-0 right-0',
						'hover:bg-neutral-900 transition-colors z-20',
						'disabled:bg-gray-300 disabled:cursor-not-allowed'
					)}>
					<UploadIcon className='w-5 h-5' />
				</button>
				<input
					ref={inputRef}
					hidden
					type='file'
					onChange={handleFileChange}
					accept='image/*'
				/>
			</div>
		</div>
	);
};
