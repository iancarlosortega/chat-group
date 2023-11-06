import { ProfilePhoto } from '../UI/profile-photo';
import { Message } from '@/interfaces';

interface Props {
	messages: Message[];
}

export const MessagesList: React.FC<Props> = ({ messages }) => {
	return (
		<div>
			{messages.map(message => (
				<div key={message.id} className='flex gap-4 mt-8'>
					<div className='w-10'>
						<ProfilePhoto user={message.user} />
					</div>
					<div className='flex-1'>
						<div className='flex items-center gap-4'>
							<p className='font-bold text-tertiary-dk'>
								{message.user.fullName}
							</p>
							<p className='font-medium text-tertiary-dk '>
								{message.createdAt as any}
							</p>
						</div>
						<p className='text-white'>{message.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};
