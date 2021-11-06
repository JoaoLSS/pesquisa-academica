import { styled, Paper } from '@material-ui/core';

export const Container = styled(Paper)({
	width: '100%',
	display: 'grid',
	padding: 20,
	gap: 20,
	justifyItems: 'flex-start',
});

export const TitleContainer = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr auto',
	gap: 10,
	alignItems: 'center',
	width: '100%',
});

export const Label = styled('label')({});
