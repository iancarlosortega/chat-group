interface Props {
	name: string;
}

export const InitialsName: React.FC<Props> = ({ name }) => {
	return (
		<div className='flex justify-center uppercase items-center h-10 w-10 rounded-lg bg-secondary text-white font-medium select-none'>
			<span>{name.split(' ')[0].charAt(0)}</span>
			<span>{name.split(' ')[1]?.charAt(0)}</span>
		</div>
	);
};
