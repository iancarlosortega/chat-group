interface Props {
	name: string;
}

export const ChatHeader: React.FC<Props> = ({ name }) => {
	return (
		<header className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 lg:px-16 h-[65px]'>
			<p className='uppercase text-white font-bold text-lg container mx-auto'>
				{name}
			</p>
		</header>
	);
};
