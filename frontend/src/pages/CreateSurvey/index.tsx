import { Navbar, StepCard, Container, ButtonContainer } from 'components';
import { Button, TextField } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { genID, onChange } from 'utils/common';
import { useMutation } from 'graphql/utils';
import { createSurvey } from 'graphql/operations/mutations';
import { useCreateSurveyOptions } from 'graphql/operations/mutations/options';
import { useRecoilTransaction } from 'utils/hooks';
import * as atoms from './recoil/atoms';
import { Question } from './components';
import { resetAllData } from './recoil/callbacks';

const CreateSurvey: React.VFC = () => {
	// STATES
	const [title, setTitle] = useRecoilState(atoms.title);
	const [questionIDs, setQuestionIDs] = useRecoilState(atoms.questionIDs);
	const isSurveyValid = useRecoilValue(atoms.isSurveyValid);
	const survey = useRecoilValue(atoms.survey);
	const resetData = useRecoilTransaction(resetAllData, []);
	const options = useCreateSurveyOptions(resetData);
	const [create, { loading }] = useMutation(createSurvey, options);

	// VALIDATORS
	const isTitleValid = title.length > 2;
	return (
		<Container>
			<Navbar title="Nova Pesquisa" />
			<StepCard success={isTitleValid} title="Dê um título para sua pesquisa" stepNumber={1}>
				<TextField
					error={!isTitleValid}
					label="Título da pesquisa"
					value={title}
					onChange={onChange(setTitle)}
				/>
			</StepCard>
			{isTitleValid && (
				<>
					<StepCard success={isSurveyValid} title="Adicione questões para sua pesquisa" stepNumber={2} />
					{questionIDs.map((questionID, index) => (
						<Question index={index} ID={questionID} key={questionID} />
					))}
					<ButtonContainer>
						{isSurveyValid && (
							<Button disabled={loading} color="success" onClick={() => !loading && create({ survey })}>
								Enviar
							</Button>
						)}
						<Button onClick={() => setQuestionIDs(genID)}>Adicionar questão</Button>
					</ButtonContainer>
				</>
			)}
		</Container>
	);
};

CreateSurvey.displayName = 'CreateSurvey';

export default CreateSurvey;
