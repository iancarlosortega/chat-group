'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface Props {
	fetchData: () => Promise<boolean>;
}

export const InfiniteScroll = ({ fetchData }: Props) => {
	const observerRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isEndOfData, setIsEndOfData] = useState(false);

	const onIntersection = useCallback(
		(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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
		[isLoading, isEndOfData, fetchData]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(onIntersection);
		if (observer && observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [onIntersection]);

	return (
		<div ref={observerRef} className='w-full'>
			{isLoading && !isEndOfData && (
				<div className='w-full flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};
