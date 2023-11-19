import { User } from '@/interfaces';

export const getSesssion = async (token: string): Promise<User | null> => {
	try {
		const data = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/check-status`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const { user } = await data.json();
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};
