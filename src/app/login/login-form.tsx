'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@tremor/react';
import { TextInput } from '@tremor/react';
import { useAuthStore } from '@/stores';

interface IFormValues {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const loginUser = useAuthStore(state => state.loginUser);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormValues>();
	const router = useRouter();

	const onSubmit = async ({ email, password }: IFormValues) => {
		try {
			await loginUser(email, password);
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form autoComplete='off' className='my-2' onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				className='mt-6'
				placeholder='Email'
				type='email'
				error={!!errors.email}
				errorMessage={errors.email?.message}
				{...register('email', {
					required: "Can't be blank",
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Please enter a valid email address',
					},
				})}
			/>
			<TextInput
				className='mt-6'
				placeholder='Password'
				type='password'
				error={!!errors.password}
				errorMessage={errors.password?.message}
				{...register('password', {
					required: "Can't be blank",
					minLength: {
						value: 3,
						message: 'Must be at least 3 chararcters',
					},
					maxLength: {
						value: 50,
						message: 'Must be less than 50 characters',
					},
				})}
			/>
			<Button className='bg-primary text-white font-bold w-full rounded-3xl border-none my-8'>
				Get Started
			</Button>
		</form>
	);
};
