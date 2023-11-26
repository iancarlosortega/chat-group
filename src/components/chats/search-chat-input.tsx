'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { TextInput } from '@tremor/react';
import { LoadingSpinnerIcon, SearchIcon } from '../icons/icons';
import { classNames } from '@/utils';

export const SearchChatInput = () => {
	const [isUpdatingSearch, setisUpdatingSearch] = useState(false);
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathName}?${params.toString()}`);
		setisUpdatingSearch(false);
	}, 500);

	const handleChangeInput = (term: string) => {
		setisUpdatingSearch(true);
		handleSearch(term);
	};

	return (
		<TextInput
			icon={isUpdatingSearch ? LoadingSpinnerIcon : SearchIcon}
			type='text'
			placeholder='Search'
			onChange={e => handleChangeInput(e.target.value)}
			defaultValue={searchParams.get('query')?.toString()}
			className={classNames(
				'bg-secondary-lt rounded-lg outline-none border-none p-2'
			)}
		/>
	);
};
