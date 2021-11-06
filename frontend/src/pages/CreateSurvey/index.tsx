import { Navbar } from 'components';
import { Button, TextField } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { genID, onChange } from 'utils/common';
import { useMutation } from 'graphql/utils';
import { createSurvey } from 'graphql/operations/mutations';
import { useCreateSurveyOptions } from 'graphql/operations/mutations/options';
import { useRecoilTransaction } from 'utils/hooks';
import * as atoms from './recoil/atoms';
import { Question } from './components';
import * as C from './styles';
import { resetAllData } from './recoil/callbacks';

const CreateSurvey: React.VFC = () => {
	const [title, setTitle] = useRecoilState(atoms.title);
	const [questionIDs, setQuestionIDs] = useRecoilState(atoms.questionIDs);
	const survey = useRecoilValue(atoms.survey);
	const resetData = useRecoilTransaction(resetAllData, []);
	const options = useCreateSurveyOptions(resetData);
	const [create, { loading }] = useMutation(createSurvey, options);
	return (
		<C.Container>
			<Navbar title="Nova Pesquisa" />
			<C.TitleContainer>
				<C.Label>Título</C.Label>
				<TextField value={title} onChange={onChange(setTitle)} />
				<Button disabled={loading} onClick={() => !loading && create({ survey })}>
					Enviar
				</Button>
			</C.TitleContainer>
			<C.QuestionsContainer>
				<C.Label>Questões</C.Label>
				{questionIDs.map((ID, index) => (
					<Question index={index} ID={ID} key={ID} />
				))}
				<Button onClick={() => setQuestionIDs(genID)}>Nova Questão</Button>
			</C.QuestionsContainer>
		</C.Container>
	);
};

CreateSurvey.displayName = 'CreateSurvey';

export default CreateSurvey;
