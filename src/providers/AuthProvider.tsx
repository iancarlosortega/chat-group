'use client';

import { useAuthStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await checkAuthStatus();
			} catch (error) {
				console.log(error);
				router.push('/login');
			}
		};
		checkAuth();
	}, [checkAuthStatus, router]);

	return <>{children}</>;
};
