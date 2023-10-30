export const ArrowLeftIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			stroke-width='1.5'
			stroke='currentColor'
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M5 12l14 0' />
			<path d='M5 12l6 6' />
			<path d='M5 12l6 -6' />
		</svg>
	);
};

export const MessageIcon = ({ className = '' }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			stroke-width='1.5'
			stroke='currentColor'
			fill='none'
			stroke-linecap='round'
			stroke-linejoin='round'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M8 9h8' />
			<path d='M8 13h6' />
			<path d='M12 21l-1 -1l-2 -2h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6' />
			<path d='M20 21l2 -2l-2 -2' />
			<path d='M17 17l-2 2l2 2' />
		</svg>
	);
};
