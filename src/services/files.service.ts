import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { chatGroupApi } from '@/api/chatGroupApi';
import { User } from '@/interfaces';

export class FilesService {
	static uploadUserAvatar = async (newFile: File): Promise<User> => {
		try {
			let formData = new FormData();
			formData.append('file', newFile, newFile.name);
			const { data } = await chatGroupApi.post('/upload', formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
				throw new Error(error.response?.data.messsage);
			}
			console.log(error);
			throw new Error('Unable to upload the file');
		}
	};
}
