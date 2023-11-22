'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Datepicker, { type DateValueType } from 'react-tailwindcss-datepicker';
import {
	Button,
	NumberInput,
	Select,
	SelectItem,
	TextInput,
} from '@tremor/react';
import { classNames } from '@/utils';
import { genders } from '@/constants';
import { UsersService } from '@/services';
import { useAuthStore } from '@/stores';

export interface UserProfile {
	fullName?: string;
	age?: number;
	birthDate?: string;
	gender?: string;
}

export const ProfileForm = () => {
	const user = useAuthStore(state => state.user);
	const setUser = useAuthStore(state => state.setUser);
	const [datePickerValue, setDatePickerValue] = useState<DateValueType>({
		startDate: user!.birthDate,
		endDate: user!.birthDate,
	});

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { dirtyFields, errors },
	} = useForm<UserProfile>({
		defaultValues: {
			fullName: user?.fullName,
			age: user?.age,
			gender: user?.gender,
			birthDate: user?.birthDate,
		},
	});

	const handleDateChange = (newValue: DateValueType) => {
		setDatePickerValue(newValue);
		setValue('birthDate', newValue?.startDate as string, { shouldDirty: true });
	};

	const onSubmit = async (userData: UserProfile) => {
		const dirtyValues = getDirtyFields(userData);
		try {
			const data = await UsersService.updateUserProfile(dirtyValues, user!.id);
			setUser(data);
			toast.success('Profile Updated');
		} catch (error) {
			console.log(error);
		}
	};

	const getDirtyFields = (data: UserProfile) => {
		let dirtyValues: any = {};
		Object.keys(dirtyFields).forEach(key => {
			const value = data[key as keyof UserProfile];
			dirtyValues = {
				...dirtyValues,
				[key]: isNaN(value as number) ? value : Number(value),
			};
		});
		return dirtyValues;
	};

	return (
		<form
			className='my-8 max-w-[900px] mx-auto'
			onSubmit={handleSubmit(onSubmit)}
			autoComplete='off'>
			<div className='grid md:grid-cols-2 gap-4 place-items-start'>
				<div className='w-full'>
					<TextInput
						placeholder='Your name'
						error={!!errors.fullName}
						errorMessage={errors.fullName?.message}
						{...register('fullName', {
							minLength: {
								value: 3,
								message: 'At least 3 characters',
							},
							maxLength: {
								value: 80,
								message: 'Maximum 80 characters',
							},
						})}
					/>
				</div>
				<div className='w-full'>
					<NumberInput
						placeholder='Age'
						min={1}
						error={!!errors.age}
						errorMessage={errors.age?.message}
						{...register('age', {
							min: {
								value: 1,
								message: 'Age should be a positive number',
							},
						})}
					/>
				</div>

				<Datepicker
					useRange={false}
					asSingle={true}
					value={datePickerValue}
					onChange={handleDateChange}
					inputClassName={classNames(
						'w-full outline-none text-left text-tremor-default whitespace-nowrap truncate',
						'rounded-tremor-default focus:ring-2 transition duration-100 shadow-tremor-input',
						'focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted cursor-pointer',
						'dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle',
						'dark:focus:ring-dark-tremor-brand-muted pl-3 pr-8 py-2 border bg-tremor-background',
						'dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:text-white',
						'dark:hover:bg-dark-tremor-background-muted text-tremor-content',
						'border-tremor-border dark:border-dark-tremor-border'
					)}
				/>

				<Controller
					control={control}
					name='gender'
					defaultValue=''
					render={({ field: { onChange, value } }) => (
						<Select placeholder='Gender' value={value} onValueChange={onChange}>
							{genders.map((gender, index) => (
								<SelectItem key={index} value={gender}>
									{gender}
								</SelectItem>
							))}
						</Select>
					)}
				/>
			</div>
			<div className='flex justify-center my-6'>
				<Button className='px-6 !text-white'>Update</Button>
			</div>
		</form>
	);
};
