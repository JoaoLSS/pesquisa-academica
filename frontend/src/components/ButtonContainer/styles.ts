import { styled } from '@material-ui/core';
import { showAnimation } from 'utils/common';

interface ContainerProps {
	nc: number;
	justify: 'center' | 'flex-start' | 'flex-end';
}

export const Container = styled('div')<ContainerProps>(({ nc, justify }) => ({
	display: 'grid',
	gap: 20,
	justifyContent: justify,
	animation: showAnimation,
	gridTemplateColumns: `repeat(${nc}, auto)`,
}));
