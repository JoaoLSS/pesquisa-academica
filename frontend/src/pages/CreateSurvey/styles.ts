import { styled, Container as MUIContainer, Paper } from '@material-ui/core';

export const Container = styled(MUIContainer)({
	display: 'grid',
	gap: 20,
	paddingTop: 50,
});

export const TitleContainer = styled(Paper)({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr auto',
	gap: 20,
	padding: 20,
	alignItems: 'center',
});

export const Label = styled('label')({});

export const QuestionsContainer = styled(Paper)({
	display: 'grid',
	justifyItems: 'flex-start',
	gap: 20,
	padding: 20,
});
