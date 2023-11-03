'use client';

import { useAuthStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

	return <>{children}</>;
};
