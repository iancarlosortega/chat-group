import Image from 'next/image';
import { User } from '@/interfaces';

export const ProfilePhoto = ({ user }: { user: User }) => {
	return (
		<>
			{user.avatarUrl ? (
				<div className='w-10 h-10'>
					<Image
						src={user.avatarUrl}
						alt='Profile Picture'
						width={40}
						height={40}
						className='rounded-lg w-full h-full object-cover'
					/>
				</div>
			) : (
				<div className='flex justify-center items-center h-10 w-10 rounded-lg bg-gray-500 dark:bg-secondary text-white font-medium select-none'>
					<span>{user.fullName.split(' ')[0].charAt(0)}</span>
					<span>{user.fullName.split(' ')[1].charAt(0)}</span>
				</div>
			)}
		</>
	);
};
