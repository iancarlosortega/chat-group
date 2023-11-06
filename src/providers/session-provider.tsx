'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { CreateChatGroupModal } from '@/components/modals/create-chat-group.modal';
import { ConfirmLogoutModal } from '@/components/modals/confirm-logout.modal';

export const SessionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await checkAuthStatus();
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				router.push('/login');
			}
		};
		checkAuth();
	}, [checkAuthStatus, router]);

	if (isLoading) return null;

	return (
		<>
			<CreateChatGroupModal />
			<ConfirmLogoutModal />
			{children}
		</>
	);
};
