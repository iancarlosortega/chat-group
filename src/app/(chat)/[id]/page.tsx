import { type Metadata } from 'next/types';
import { redirect } from 'next/navigation';
import { ChatsService } from '@/services';
import { ChatClientLayout } from '@/components/chats/chat-client-layout';
import { MessagesList } from '@/components/messages/messages-list';
import { MessageInput } from '@/components/messages/message-input';
import { ChatHeader } from '@/components/chats/chat-header';

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const id = params.id;
	const chat = await ChatsService.getChatById(id);
	return {
		title: `${chat?.name ?? ''} | Chat Group`,
		description: chat?.description,
	};
}

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
			<section className='container mx-auto'>
				<MessagesList />
				<div className='h-[100px] flex items-center px-4 lg:px-12 xl:px-16'>
					<MessageInput />
				</div>
			</section>
		</ChatClientLayout>
	);
}
