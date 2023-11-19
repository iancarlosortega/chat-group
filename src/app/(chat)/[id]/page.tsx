import { redirect } from 'next/navigation';
import { ChatsService } from '@/services';
import { ChatClientLayout } from '@/components/chats/chat-client-layout';
import { ChatHeader } from '@/components/chats/chat-header';
import { MessagesList } from '@/components/messages/messages-list';
import { MessageInput } from '@/components/messages/message-input';

export default async function ChatPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const chat = await ChatsService.getChatById(id);

	if (!chat) redirect('/');

	return (
		<ChatClientLayout chat={chat}>
			<ChatHeader />
			<section className='container mx-auto px-4 xl:px-16'>
				<MessagesList />
				<div className='h-[100px] flex items-center'>
					<MessageInput />
				</div>
			</section>
		</ChatClientLayout>
	);
}
