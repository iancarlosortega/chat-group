import Link from 'next/link';
import { ArrowLeftIcon, MessageIcon } from '../icons/icons';
import { classNames } from '@/utils/functions/classNames';

interface Props {
	children: React.ReactNode;
	title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
	return (
		<section className='min-h-screen h-screen w-full bg-tertiary dark:bg-[#151516] flex items-center justify-center'>
			<h3
				className={classNames(
					'hidden md:block font-kanit select-none overflow-hidden font-bold uppercase text-[#f7f7f7] dark:text-[#1B1B1F] drop-shadow-md',
					'absolute z-10 text-center top-10  left-0 w-full text-[12rem] tracking-[1rem] leading-[15rem]',
					'lg:top-5 lg:text-[15rem] lg:tracking-[2rem] 2xl:tracking-[3rem] 2xl:text-[18	rem]'
				)}>
				{title}
			</h3>
			<main className='z-20 rounded-2xl p-6 max-w-[90%] w-[980px] relative drop-shadow-md'>
				<div className='z-20 relative max-h-[90%] h-[550px] flex flex-col justify-between'>
					<header className='flex justify-between items-center'>
						<h1 className='text-white text-xl font-bold'>Chat Group</h1>
						<MessageIcon className='text-gray-500' />
					</header>
					<article className='shadow-2xl rounded-2xl bg-white dark:bg-[#18181A] w-[400px] max-w-full mx-auto px-6 py-4'>
						<header className='flex flex-col gap-2 items-center my-4'>
							<h2 className='text-lg text-gray-500 dark:text-gray-200 uppercase'>
								{title}
							</h2>
							<div className='w-8 h-1 bg-primary'></div>
						</header>
						{children}
					</article>
					<footer className='flex justify-between items-center'>
						<Link href='/' className='text-white flex items-center gap-2'>
							<ArrowLeftIcon />
							Home
						</Link>
						<p className='text-gray-500'>&copy;Copyright 2023</p>
					</footer>
				</div>
				{/* Bg Colors */}
				<div className='w-[50%] h-full bg-gradient-to-br from-primary/80 to bg-blue-800/80 absolute top-0 left-0 rounded-l-2xl'></div>
				<div className='w-[50%] h-full bg-gradient-to-tr from-[#FAFAFA]/80 to-white/80 absolute top-0 right-0 rounded-r-2xl dark:from-[#2E3035]/80 dark:to-[#27282D]/80'></div>
			</main>
		</section>
	);
};
