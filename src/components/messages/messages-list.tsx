'use client';

import { ProfilePhoto } from '../UI/profile-photo';
import { Message } from '@/interfaces';
import { useAuthStore } from '@/stores';
import { formatDate } from '@/utils';
import moment from 'moment';

interface Props {
	messages: Message[];
}

export const MessagesList: React.FC<Props> = ({ messages }) => {
	const user = useAuthStore(state => state.user);

	return (
		<div>
			{messages.map(message => (
				<div key={message.id} className='flex gap-4 mt-8'>
					{user?.id !== message.user.id && (
						<div className='w-10'>
							<ProfilePhoto user={message.user} />
						</div>
					)}
					<div className='flex-1'>
						<div
							className={`flex items-center gap-4 ${
								user?.id === message.user.id && 'justify-end'
							}`}>
							{user?.id !== message.user.id && (
								<p className='font-bold text-tertiary-dk'>
									{message.user.fullName}
								</p>
							)}
							<p className='font-medium text-tertiary-dk '>
								{formatDate(message.createdAt)}
							</p>
						</div>
						<p
							className={`text-white ${
								user?.id === message.user.id && 'text-right'
							}`}>
							{message.content}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};
