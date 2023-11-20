import { SessionProvider } from '@/providers';
import { ChatsService } from '@/services';
import { Sidebar } from '@/components/UI/sidebar';
import { ChatInformation } from '@/components/chats/chat-information';
import { ChatHeader } from '@/components/chats/chat-header';

export default async function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { result: chats } = await ChatsService.getAllChats();

	return (
		<SessionProvider>
			<div className='flex'>
				<ChatInformation />
				<Sidebar chats={chats} />
				<main className='flex-1 bg-secondary'>
					<ChatHeader />
					{children}
				</main>
			</div>
		</SessionProvider>
	);
}
