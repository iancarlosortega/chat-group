import { Message } from '@/interfaces';
import { checkNextMessage, checkPreviousMessage, formatDate } from '@/utils';
import { ProfilePhoto } from '../UI/profile-photo';

interface Props {
	message: Message;
	messages: Message[];
}

export const GuestMessage = ({ message, messages }: Props) => {
	return (
		<div className='w-full mt-2'>
			<div className='flex items-end gap-4'>
				<div
					className={`w-10 ${
						!checkPreviousMessage(message, messages)
							? 'opacity-100'
							: 'opacity-0'
					}`}>
					<ProfilePhoto user={message.user} />
				</div>
				<div className='flex-1'>
					<div className='flex flex-col gap-2 items-start'>
						{!checkNextMessage(message, messages) && (
							<p className='font-bold text-tertiary-dk'>
								{message.user.fullName}
							</p>
						)}
						<p
							className={`text-white bg-secondary-dk px-4 py-2 rounded-xl ${
								checkNextMessage(message, messages) &&
								checkPreviousMessage(message, messages)
									? 'rounded-l-md'
									: checkNextMessage(message, messages)
									? 'rounded-tl-none'
									: checkPreviousMessage(message, messages)
									? 'rounded-bl-none'
									: ''
							}`}>
							{message.content}
						</p>
					</div>
				</div>
			</div>
			{!checkPreviousMessage(message, messages) && (
				<p className='text-xs font-medium text-tertiary-dk pl-16 pt-3'>
					{formatDate(message.createdAt)}
				</p>
			)}
		</div>
	);
};
