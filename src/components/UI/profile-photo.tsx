import Image from 'next/image';
import { User } from '@/interfaces';
import { InitialsName } from './initials-name';

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
				<InitialsName name={user.fullName} />
			)}
		</>
	);
};
