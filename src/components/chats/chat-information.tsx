'use client';

import { useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/stores';
import { ArrowLeftIcon } from '../icons/icons';
import { useOutsideAlerter } from '@/utils';

export const ChatInformation = () => {
	const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
	const isChatInformationOpen = useUIStore(
		state => state.isChatInformationOpen
	);
	const setIsChatInformationOpen = useUIStore(
		state => state.setIsChatInformationOpen
	);

	const handleClose = () => {
		setIsChatInformationOpen(false);
	};

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, handleClose);

	useLayoutEffect(() => {
		function updateSize() {
			if (!isSidebarOpen) return setIsChatInformationOpen(false);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, [isSidebarOpen, setIsChatInformationOpen]);

	return (
		<AnimatePresence>
			{isChatInformationOpen && (
				<motion.aside
					ref={wrapperRef}
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					exit={{ x: '-100%' }}
					transition={{ duration: 0.3 }}
					className='h-[calc(100vh-100px)] w-[400px] max-w-[80%] bg-secondary-dk flex flex-col justify-between absolute top-0 left-0 z-20'>
					<div className='flex-1 text-white'>
						<header className='shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 flex gap-4 items-center h-[65px]'>
							<button onClick={handleClose}>
								<ArrowLeftIcon />
							</button>
							<p className='font-bold text-lg'>Channels</p>
						</header>
						<div className='p-4 h-[calc(100vh-165px)] flex flex-col'></div>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
};
