import type { Metadata } from 'next/types';
import Link from 'next/link';
import { RegisterForm } from './register-form';
import { ArrowLeftIcon, MessageIcon } from '@/components/icons/icons';
import { classNames } from '@/utils/functions/classNames';
import { AuthLayout } from '@/components/layouts/auth-layout';

export const metadata: Metadata = {
	title: 'Register | Chat Group',
	description: 'Register easily and chat with all your friends!',
};

export default function RegisterPage() {
	return (
		<AuthLayout title='Sign Up'>
			<RegisterForm />
			<footer>
				<p className='mb-2 text-center text-sm font-medium text-gray-500 dark:text-gray-200'>
					Already have an account?{' '}
					<Link href='/login' className='text-primary'>
						Sign in
					</Link>
				</p>
			</footer>
		</AuthLayout>
	);
}
