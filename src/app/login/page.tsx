import type { Metadata } from 'next/types';
import Link from 'next/link';
import { LoginForm } from './login-form';
import { ArrowLeftIcon, MessageIcon } from '@/components/icons/icons';
import { classNames } from '@/utils/functions/classNames';
import { AuthLayout } from '@/components/layouts/auth-layout';

export const metadata: Metadata = {
	title: 'Login | Chat Group',
	description: 'Log in to your account to chat with all your friends!',
};

export default function LoginPage() {
	return (
		<AuthLayout title='Sign In'>
			<LoginForm />
			<footer>
				<p className='mb-2 text-center text-sm font-medium text-gray-500 dark:text-gray-200'>
					Don&apos;t have an account?{' '}
					<Link href='/register' className='text-primary'>
						Sign up
					</Link>
				</p>
			</footer>
		</AuthLayout>
	);
}
