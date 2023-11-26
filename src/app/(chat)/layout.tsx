import { SessionProvider } from '@/providers';
import { Sidebar } from '@/components/UI/sidebar';
import { ChatInformation } from '@/components/chats/chat-information';

export default async function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<div className='flex'>
				<ChatInformation />
				<Sidebar />
				<main className='flex-1'>{children}</main>
			</div>
		</SessionProvider>
	);
}
