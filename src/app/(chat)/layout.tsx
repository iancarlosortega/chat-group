import { Sidebar } from '@/components/UI/sidebar';
import { AuthProvider } from '@/providers';

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthProvider>
			<div className='flex'>
				<Sidebar />
				<main className='flex-1 bg-red-400'>{children}</main>
			</div>
		</AuthProvider>
	);
}
