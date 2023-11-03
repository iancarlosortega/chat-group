import type { Metadata } from 'next/types';
import Link from 'next/link';
import { Kanit } from 'next/font/google';
import { RegisterForm } from './register-form';
import { ArrowLeftIcon, MessageIcon } from '@/components/icons/icons';

export const metadata: Metadata = {
	title: 'Login | Chat Group',
	description: 'Log in to your account to chat with all your friends!',
};

export default function RegisterPage() {
	return (
		<section className='min-h-screen h-screen w-full bg-tertiary flex items-center justify-center'>
			<h3 className='font-kanit select-none font-bold absolute z-10 text-center top-5 left-0 w-full text-[18rem] tracking-[3rem] leading-[15rem] uppercase text-[#f7f7f7] drop-shadow-md'>
				Sign Up
			</h3>
			<main className='z-20 rounded-2xl p-6 max-w-[90%] w-[980px] relative drop-shadow-md'>
				<div className='z-20 relative max-h-[90%] h-[550px] flex flex-col justify-between'>
					<header className='flex justify-between items-center'>
						<h1 className='text-white text-xl font-bold'>Chat Group</h1>
						<MessageIcon className='text-gray-500' />
					</header>
					<article className='shadow-2xl rounded-2xl bg-white w-[400px] max-w-full mx-auto px-6 py-4'>
						<header className='flex flex-col gap-2 items-center my-4'>
							<h2 className='text-lg text-gray-500 uppercase'>Sign Up</h2>
							<div className='w-8 h-1 bg-primary'></div>
						</header>
						<RegisterForm />

						<footer>
							<p className='mb-2 text-center text-sm font-bold text-gray-500'>
								Already have an account?{' '}
								<Link href='/login' className='text-primary'>
									Sign in
								</Link>
							</p>
						</footer>
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
				<div className='w-[50%] h-full bg-gradient-to-br from-primary/80 to bg-red-800/80 absolute top-0 left-0 rounded-l-2xl'></div>
				<div className='w-[50%] h-full bg-gradient-to-tr from-[#FAFAFA]/80 to-white/80 absolute top-0 right-0 rounded-r-2xl'></div>
			</main>
		</section>
	);
}
