'use client';

import { useEffect, useState } from 'react';
import { TextInput } from '@tremor/react';
import { LoadingSpinnerIcon, SearchIcon } from '../icons/icons';
import { classNames } from '@/utils';
import { ChatsService } from '@/services';
import { useChatStore } from '@/stores';

export const SearchChatInput = () => {
	const [isFirstRenderer, setIsFirstRenderer] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [isUpdatingChats, setIsUpdatingChats] = useState(false);
	const setChats = useChatStore(state => state.setChats);

	useEffect(() => {
		if (isFirstRenderer) return;
		// Set a timer to update the debounced value after a specified delay
		const debounceTimer = setTimeout(async () => {
			const data = await ChatsService.getChatsByTerm(inputValue);
			setChats(data.result);
			setIsUpdatingChats(false);
		}, 1200);

		// Clear the timer if the value changes before the delay time
		return () => {
			clearTimeout(debounceTimer);
		};
	}, [inputValue, isFirstRenderer, setChats]);

	const handleInputChange = (e: any) => {
		setIsUpdatingChats(true);
		setIsFirstRenderer(false);
		setInputValue(e.target.value);
	};

	return (
		<TextInput
			icon={isUpdatingChats ? LoadingSpinnerIcon : SearchIcon}
			type='text'
			placeholder='Search'
			onChange={handleInputChange}
			className={classNames(
				'bg-secondary-lt rounded-lg outline-none border-none p-2'
			)}
		/>
	);
};
