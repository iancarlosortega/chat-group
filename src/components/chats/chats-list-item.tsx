import { Chat } from '@/interfaces';
import { InitialsName } from '../UI/initials-name';
import Link from 'next/link';

interface Props {
	chat: Chat;
}

export const ChatsListItem: React.FC<Props> = ({ chat }) => {
	return (
		<li className='my-4'>
			<Link href={chat.id} className='flex items-center my-4 gap-4'>
				<InitialsName name={chat.name} />
				<p className='uppercase text-[#BDBDBD] font-bold'>{chat.name}</p>
			</Link>
		</li>
	);
};
