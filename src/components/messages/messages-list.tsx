'use client';

import { useEffect, useRef } from 'react';
import { ProfilePhoto } from '../UI/profile-photo';
import { formatDate } from '@/utils';
import { Message, User } from '@/interfaces';

interface Props {
	messages: Message[];
	user: User;
}

export const MessagesList: React.FC<Props> = ({ messages, user }) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bottomRef.current)
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<>
			<div className='messages-container h-[calc(100vh-165px)] p-4 lg:px-16 overflow-y-auto flex flex-col-reverse items-end'>
				{messages.map(message => (
					<div
						key={message.id}
						className={`w-full flex gap-4 mt-4 ${
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
			</div>
			<div ref={bottomRef}></div>
		</>
	);
};
