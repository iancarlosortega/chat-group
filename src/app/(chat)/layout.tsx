import { Sidebar } from '@/components/UI/sidebar';
import { SessionProvider } from '@/providers';
import { ChatsService } from '@/services';

export default async function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const chats = await ChatsService.getAllChats();

	return (
		<SessionProvider>
			<div className='flex'>
				<Sidebar chats={chats} />
				<main className='flex-1 bg-red-400'>{children}</main>
			</div>
		</SessionProvider>
	);
}
