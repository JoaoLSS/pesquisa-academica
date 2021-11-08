import { Typography } from '@material-ui/core';
import { Paper } from 'components/Paper';
import * as C from './styles';

interface StepCardProps {
	success: boolean;
	stepNumber?: number;
	title: string;
	onClick?: () => void;
}

export const StepCard: React.FC<StepCardProps> = ({ children, success, stepNumber, title, onClick }) => (
	<Paper accentColor={success ? 'success' : 'primary'} onClick={onClick}>
		<C.Header>
			{stepNumber === undefined ? (
				<C.BubblePlaceholder />
			) : (
				<C.Bubble success={success}>{stepNumber}</C.Bubble>
			)}
			<Typography variant="h5">{title}</Typography>
		</C.Header>
		<C.ContentContainer>{children}</C.ContentContainer>
	</Paper>
);

StepCard.displayName = 'StepCard';
