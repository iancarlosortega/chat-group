'use client';

import { Button } from '@tremor/react';
import { TextInput } from '@tremor/react';
import { useForm } from 'react-hook-form';

interface IFormValues {
	name: string;
	email: string;
	password: string;
}

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = ({ name, email, password }: IFormValues) => {
		console.log(name, email, password);
		// TODO: Call an API and login user
	};

	return (
		<form className='my-2' onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				className='mt-6'
				placeholder='Name'
				type='text'
				error={!!errors.name}
				errorMessage={errors.name?.message}
				{...register('name', {
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