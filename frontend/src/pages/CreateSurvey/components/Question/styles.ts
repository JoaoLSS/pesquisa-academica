import { styled } from '@material-ui/core';

export const Container = styled('div')({
	display: 'grid',
	gap: '20px',
});

export const ButtonsContainer = styled('div')(({ theme }) => ({
	borderTop: `1px solid ${theme.palette.grey[300]}`,
	display: 'grid',
	justifyItems: 'flex-end',
}));

export const AlternativesContainer = styled('div')({
	display: 'grid',
	justifyItems: 'flex-start',
	gap: '20px',
});
