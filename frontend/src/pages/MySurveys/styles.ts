import { styled } from '@material-ui/core';

export const SurveyContainer = styled('div')({
	display: 'grid',
	justifyContent: 'flex-start',
	gap: 10,
});

export const DatesContainer = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	gap: 10,
});
