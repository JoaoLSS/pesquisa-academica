import { styled } from '@material-ui/core';

export const Header = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gap: 20,
	alignItems: 'center',
});

export const Bubble = styled('div')<{ success: boolean }>(({ theme, success }) => ({
	display: 'grid',
	placeItems: 'center',
	borderRadius: '50%',
	backgroundColor: success ? theme.palette.success.main : theme.palette.primary.main,
	width: '40px',
	height: '40px',
	color: 'white',
	transition: 'background-color 0.5s',
}));

export const BubblePlaceholder = styled('div')({
	width: '40px',
	height: '40px',
});

export const ContentContainer = styled('div')({
	paddingLeft: '60px',
	width: '100%',
	display: 'grid',
});
