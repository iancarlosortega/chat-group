import moment from 'moment';

export function formatDate(date: string) {
	const today = moment();
	const dateTime = moment(date);

	const differenceDays = today.diff(dateTime, 'days');
	let difference = '';

	switch (differenceDays) {
		case 0:
			difference = 'today';
			break;

		case 1:
			difference = 'yesterday';
			break;

		default:
			difference = dateTime.fromNow();
			break;
	}

	return `${difference} at ${dateTime.format('h:mm:ss A')}`;
}
