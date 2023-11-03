import { Sidebar } from '@/components/UI/sidebar';
import { SessionProvider } from '@/providers';

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<div className='flex'>
				<Sidebar />
				<main className='flex-1 bg-red-400'>{children}</main>
			</div>
		</SessionProvider>
	);
}
