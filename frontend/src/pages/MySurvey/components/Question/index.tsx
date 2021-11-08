/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import { Typography, styled } from '@material-ui/core';
import { keyframes } from '@material-ui/system';
import { StepCard } from 'components';
import { GetMySurvey_mySurvey_questions } from 'graphql/operations/queries/__generated__';
import { useRecoilValue } from 'recoil';
import * as atoms from '../../recoil/atoms';

interface QuestionProps {
	index: number;
	question: GetMySurvey_mySurvey_questions;
	surveyId: string;
}

const AlternativesContainer = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'auto auto 1fr',
	gap: 10,
	alignItems: 'center',
	padding: 10,
});

const barAnimation = keyframes`
from {
	width: 0
}
to {
	width: 100%
}
`;

const BarContainer = styled('div')<{ percentage: number }>(({ percentage }) => ({
	width: `${percentage * 100}%`,
}));

const Bar = styled('div')(({ theme }) => ({
	height: '5px',
	animation: `${barAnimation} 0.5s 1 ease`,
	backgroundColor: theme.palette.primary.main,
}));

export const Question: React.FC<QuestionProps> = ({ index, question, surveyId }) => {
	const percentages = useRecoilValue(
		atoms.alternativesPercentage({ questionId: question.id, surveyId }),
	);
	return (
		<StepCard stepNumber={index + 1} title={question.text} success={false}>
			<Typography color="GrayText">ALTERNATIVAS</Typography>
			<AlternativesContainer>
				{percentages.map((a, i) => [
					<Typography key={`a-${i}`}>{a.text}</Typography>,
					<Typography key={`b-${i}`}>{`${Math.floor(a.percentage * 100)}%`}</Typography>,
					<BarContainer key={`c-${i}`} percentage={a.percentage}>
						<Bar />
					</BarContainer>,
				])}
			</AlternativesContainer>
		</StepCard>
	);
};

Question.displayName = 'Question';
