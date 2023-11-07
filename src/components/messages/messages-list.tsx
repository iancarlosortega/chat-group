'use client';

import { useEffect, useRef } from 'react';
import { ProfilePhoto } from '../UI/profile-photo';
import { useAuthStore } from '@/stores';
import { formatDate } from '@/utils';
import { Message } from '@/interfaces';

interface Props {
	messages: Message[];
}

export const MessagesList: React.FC<Props> = ({ messages }) => {
	const user = useAuthStore(state => state.user);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bottomRef.current)
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div>
			{messages.map(message => (
				<div
					key={message.id}
					className={`flex gap-4 mt-4 ${
						user?.id === message.user.id && 'flex-row-reverse'
					}`}>
					{user?.id !== message.user.id && (
						<div className='w-10'>
							<ProfilePhoto user={message.user} />
						</div>
					)}
					<div className='flex-1'>
						<div
							className={`flex flex-col gap-2 ${
								user?.id === message.user.id ? 'items-end' : 'items-start'
							}`}>
							{user?.id !== message.user.id && (
								<p className='font-bold text-tertiary-dk'>
									{message.user.fullName}
								</p>
							)}
							<p
								className={`text-white bg-secondary-dk px-4 py-2 rounded-xl ${
									user?.id === message.user.id ? '' : 'rounded-tl-none'
								}`}>
								{message.content}
							</p>
							<p className='text-xs font-medium text-tertiary-dk '>
								{formatDate(message.createdAt)}
							</p>
						</div>
					</div>
				</div>
			))}
			<div ref={bottomRef}></div>
		</div>
	);
};
