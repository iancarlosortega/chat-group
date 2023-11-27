import { SessionProvider } from '@/providers/session-provider';
import { Sidebar } from '@/components/UI/sidebar';

export default async function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<div className='flex'>
				<Sidebar />
				<main className='flex-1'>{children}</main>
			</div>
		</SessionProvider>
	);
}
