import { Message } from '@/interfaces';
import { checkNextMessage, checkPreviousMessage, formatDate } from '@/utils';

interface Props {
	message: Message;
	messages: Message[];
}

export const OwnerMessage = ({ message, messages }: Props) => {
	return (
		<div className='flex flex-col gap-2 items-end mt-2'>
			<p
				className={`text-white bg-secondary-dk px-4 py-2 rounded-xl ${
					checkNextMessage(message, messages) &&
					checkPreviousMessage(message, messages)
						? 'rounded-r-md'
						: checkNextMessage(message, messages)
						? 'rounded-tr-none'
						: checkPreviousMessage(message, messages)
						? 'rounded-br-none'
						: ''
				}`}>
				{message.content}
			</p>
			{!checkPreviousMessage(message, messages) && (
				<p className='text-xs font-medium text-tertiary-dk '>
					{formatDate(message.createdAt)}
				</p>
			)}
		</div>
	);
};
