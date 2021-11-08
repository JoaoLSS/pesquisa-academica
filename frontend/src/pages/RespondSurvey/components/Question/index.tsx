/* eslint-disable camelcase */
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { StepCard } from 'components';
import { GetMySurvey_mySurvey_questions } from 'graphql/operations/queries/__generated__';
import { useRecoilState } from 'recoil';
import * as atoms from '../../recoil/atoms';

interface QuestionProps {
	question: GetMySurvey_mySurvey_questions;
	index: number;
}

export const Question: React.FC<QuestionProps> = ({ question, index }) => {
	const [response, setResponse] = useRecoilState(atoms.questionResponse(question.id));
	return (
		<StepCard title={question.text} success={!!response} stepNumber={index + 1}>
			<Typography color="GrayText">ALTERNATIVAS</Typography>
			<RadioGroup value={response} onChange={(e) => setResponse(e.target.value)}>
				{question.alternatives.map((alternative) => (
					<FormControlLabel
						key={alternative.id}
						value={alternative.id}
						control={<Radio />}
						label={alternative.text}
					/>
				))}
			</RadioGroup>
		</StepCard>
	);
};

Question.displayName = 'Question';
