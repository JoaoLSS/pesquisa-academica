import { styled, Container as MUIContainer, Paper } from '@material-ui/core';

export const Container = styled(MUIContainer)({
	minHeight: '100vh',
	placeItems: 'center',
	display: 'grid',
});

export const LoginPanel = styled(Paper)({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	padding: '50px',
	gap: '50px',
	gridTemplateAreas: '"title title""img form"',
	'& img': {
		gridArea: 'img',
		width: '400px',
	},
	'@media (max-width: 900px)': {
		gridTemplateAreas: '"title title""form form"',
		'& img': {
			display: 'none',
		},
	},
});

export const SigninForm = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'auto',
	alignItems: 'center',
	alignContent: 'center',
	gap: '10px',
	gridArea: 'form',
});

export const Title = styled('label')({
	fontSize: '40px',
	gridArea: 'title',
	textAlign: 'center',
});

export const AlreadyRegistered = styled('label')({
	fontSize: '0.75rem',
	textAlign: 'center',
	marginTop: '10px',
});
