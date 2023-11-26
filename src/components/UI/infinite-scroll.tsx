'use client';

import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface Props {
	root: HTMLElement;
	rootMargin?: string;
	fetchData: () => Promise<boolean>;
}

export const InfiniteScroll = ({
	root,
	rootMargin = '0px',
	fetchData,
}: Props) => {
	const observerRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isEndOfData, setIsEndOfData] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver
			) => {
				if (entries[0].isIntersecting && !isLoading && !isEndOfData) {
					setIsLoading(true);
					fetchData().then(hasMoreData => {
						setIsLoading(false);
						if (!hasMoreData) {
							setIsEndOfData(true);
							observer.unobserve(observerRef.current!);
						}
					});
				}
			},
			{
				root,
				rootMargin,
			}
		);
		if (observer && observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [isLoading, isEndOfData, fetchData, root, rootMargin]);

	return <div ref={observerRef} className='w-full'></div>;
};
