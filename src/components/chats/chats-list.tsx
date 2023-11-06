import { ChatsListItem } from './chats-list-item';
import { Chat } from '@/interfaces';

interface Props {
	chats: Chat[];
}

export const ChatsList: React.FC<Props> = ({ chats }) => {
	return (
		<ul className='my-6'>
			{chats.map(chat => (
				<ChatsListItem key={chat.id} chat={chat} />
			))}
		</ul>
	);
};
