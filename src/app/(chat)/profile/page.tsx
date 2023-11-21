import { UploadProfilePhoto } from '@/components/UI/upload-profile-photo';
import { ChatHeader } from '@/components/chats/chat-header';

export default function ProfilePage() {
	return (
		<>
			<ChatHeader chatName='Profile' />
			<section className='h-[calc(100vh-65px)] p-4 lg:py-8 lg:px-12 xl:px-16 container mx-auto'>
				<UploadProfilePhoto />
			</section>
		</>
	);
}
