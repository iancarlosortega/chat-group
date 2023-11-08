import { redirect } from 'next/navigation';
import { ChatsService, MessagesService } from '@/services';
import { ChatHeader } from '@/components/chats/chat-header';
import { MessagesSection } from '@/components/messages/messages-section';

export default async function ChatPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const chat = await ChatsService.getChatById(id);

	if (!chat) redirect('/');

	// TODO: Group messages by day
	const response = await MessagesService.getMessagesByChatId({
		chatId: chat.id,
	});

	return (
		<>
			<ChatHeader name={chat.name} />
			<MessagesSection chatId={chat.id} messages={response.result} />
		</>
	);
}
