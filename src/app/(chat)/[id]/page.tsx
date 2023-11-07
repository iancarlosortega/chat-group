import { redirect } from 'next/navigation';
import { ChatsService, MessagesService } from '@/services';
import { ChatHeader } from '@/components/chats/chat-header';
import { MessageInput } from '@/components/messages/message-input';
import { MessagesList } from '@/components/messages/messages-list';

export default async function ChatPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const chat = await ChatsService.getChatById(id);

	// TODO: Place not found placeholder
	if (!chat) redirect('/');

	// TODO: Group messages by day
	const messages = await MessagesService.getMessagesByChatId(chat.id);

	return (
		<>
			<ChatHeader name={chat.name} />
			<section className='h-[calc(100vh-165px)] p-4 lg:px-16 overflow-y-auto'>
				<MessagesList messages={messages} />
			</section>
			<div className='container mx-auto h-[100px] flex items-center p-4 lg:px-16'>
				<MessageInput chatId={chat.id} />
			</div>
		</>
	);
}
