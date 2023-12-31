import type { Metadata } from 'next';
import { Noto_Sans, Kanit } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import './globals.css';

const notoSans = Noto_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-noto-sans',
});

const kanit = Kanit({
	subsets: ['latin'],
	weight: ['700'],
	variable: '--font-kanit',
});

export const metadata: Metadata = {
	title: 'Chat Group',
	description: 'Chat with all your friends at the same time!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${notoSans.className} ${kanit.variable} bg-secondary dark`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
