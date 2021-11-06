/* eslint-disable camelcase */
import { Button, IconButton, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { excludeQuestion } from 'pages/CreateSurvey/recoil/callbacks';
import { useRecoilState } from 'recoil';
import { genID, onChange } from 'utils/common';
import { useRecoilTransaction } from 'utils/hooks';
import * as atoms from '../../recoil/atoms';
import { Alternative } from '../Alternative';
import * as C from './styles';

interface QuestionProps {
	ID: string;
	index: number;
}

export const Question: React.FC<QuestionProps> = ({ ID, index }) => {
	const [title, setTitle] = useRecoilState(atoms.questionTitle(ID));
	const [alternativeIDs, setAlternativeIDs] = useRecoilState(atoms.alternativeIDs(ID));
	const removeQuestion = useRecoilTransaction(excludeQuestion, [ID]);
	return (
		<C.Container>
			<C.TitleContainer>
				{`${index + 1}.`}
				<TextField label="Título da questão" value={title} onChange={onChange(setTitle)} />
				<IconButton onClick={removeQuestion}>
					<Close />
				</IconButton>
			</C.TitleContainer>
			<C.Label>Alternativas</C.Label>
			{alternativeIDs.map((altID, altIndex) => (
				<Alternative key={altID} questionID={ID} ID={altID} index={altIndex} />
			))}
			<Button onClick={() => setAlternativeIDs(genID)}>Nova alternativa</Button>
		</C.Container>
	);
};

Question.displayName = 'Question';
