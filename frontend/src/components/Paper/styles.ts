import { styled, Paper } from '@material-ui/core';
import { showAnimation } from 'utils/common';

export const Container = styled(Paper)<{ cursor: 'pointer' | 'unset' }>(({ cursor }) => ({
	padding: '20px',
	display: 'grid',
	position: 'relative',
	overflow: 'hidden',
	animation: showAnimation,
	gap: 20,
	borderRadius: '10px',
	boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.1)',
	cursor,
}));

export const BlueLine = styled('div')<{ accentColor: 'primary' | 'success' }>(({ theme, accentColor }) => ({
	width: '5px',
	height: '100%',
	position: 'absolute',
	backgroundColor: theme.palette[accentColor].main,
}));
