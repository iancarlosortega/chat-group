import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { chatGroupApi } from '@/api/chatGroupApi';
import { UserProfile } from '@/app/(chat)/profile/profile-form';
import { User } from '@/interfaces';

export class UsersService {
	static updateUserProfile = async (
		user: UserProfile,
		userId: string
	): Promise<User> => {
		try {
			const { data } = await chatGroupApi.patch(`/users/${userId}`, user);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
				throw new Error(error.response?.data.messsage);
			}
			console.log(error);
			throw new Error('Unable to upload profile');
		}
	};
}
