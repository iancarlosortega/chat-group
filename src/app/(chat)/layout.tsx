import { AuthProvider } from '@/providers';
import React from 'react';

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthProvider>{children}</AuthProvider>;
}
