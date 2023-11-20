import { MessageIcon } from '@/components/icons/icons';

export default function Home() {
	return (
		<div className='h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 lg:px-12 xl:px-16 text-white text-center'>
			<MessageIcon className='w-20 h-20 text-gray-400' />
			<p className='text-4xl '>
				Welcome to <span className='text-gray-400 font-bold'>Chat Group</span>
			</p>
			<p className='mt-6 font-medium text-lg'>
				Chat with your friends or teamates in channels!
			</p>
			<p className='font-medium text-lg'>
				You can create a new channel or join to existing one in the left-side
				panel :){' '}
			</p>
		</div>
	);
}
