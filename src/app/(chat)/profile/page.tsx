import { ChatHeader } from '@/components/chats/chat-header';
import { UploadProfilePhoto } from '@/app/(chat)/profile/upload-profile-photo';
import { ProfileForm } from './profile-form';

export default function ProfilePage() {
	return (
		<>
			<ChatHeader chatName='Profile' />
			<section className='h-[calc(100vh-65px)] p-4 lg:py-8 lg:px-12 xl:px-16 container mx-auto'>
				<UploadProfilePhoto />
				<ProfileForm />
			</section>
		</>
	);
}
