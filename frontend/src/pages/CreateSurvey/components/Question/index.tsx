/* eslint-disable camelcase */
import { Button, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Delete } from '@material-ui/icons';
import { Paper } from 'components/Paper';
import { excludeQuestion } from 'pages/CreateSurvey/recoil/callbacks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { genID, onChange } from 'utils/common';
import { useRecoilTransaction } from 'utils/hooks';
import * as atoms from '../../recoil/atoms';
import { Alternative } from '../Alternative';
import * as C from './styles';

interface QuestionProps {
	ID: string;
	index: number;
}

const startAdornment = (index: number) => ({
	startAdornment: <InputAdornment position="start">{index + 1})</InputAdornment>,
});

export const Question: React.FC<QuestionProps> = ({ ID, index }) => {
	// STATE
	const [title, setTitle] = useRecoilState(atoms.questionTitle(ID));
	const [alternativeIDs, setAlternativeIDs] = useRecoilState(atoms.alternativeIDs(ID));
	const isQuestionValid = useRecoilValue(atoms.isQuestionValid(ID));

	// CALLBACKS
	const removeQuestion = useRecoilTransaction(excludeQuestion, [ID]);

	// VALIDATORS
	const isValidTitle = title.length > 2;

	return (
		<Paper accentColor={isQuestionValid ? 'success' : 'primary'}>
			<C.Container>
				<TextField
					value={title}
					onChange={onChange(setTitle)}
					error={!isValidTitle}
					InputProps={startAdornment(index)}
				/>
				<C.AlternativesContainer>
					<Typography color="GrayText">ALTERNATIVAS</Typography>
					{alternativeIDs.map((altID, altIndex) => (
						<Alternative ID={altID} index={altIndex} questionID={ID} key={altID} />
					))}
					<Button onClick={() => setAlternativeIDs(genID)}>Adicionar alternativa</Button>
				</C.AlternativesContainer>
				<C.ButtonsContainer>
					<IconButton onClick={removeQuestion}>
						<Delete sx={{ color: grey[500] }} />
					</IconButton>
				</C.ButtonsContainer>
			</C.Container>
		</Paper>
	);
};

Question.displayName = 'Question';
