import moment from 'moment';

export function formatDate(date: string) {
	const dateTime = moment(date);
	const today = moment();
	const yesterday = moment().subtract(1, 'days').startOf('day');

	let difference = dateTime.fromNow();

	if (dateTime.isSame(today, 'd')) {
		difference = 'today';
	} else if (dateTime.isSame(yesterday, 'd')) {
		difference = 'yesterday';
	}

	return `${difference} at ${dateTime.format('h:mm:ss A')}`;
}
