import { Button } from '@material-ui/core';
import { ButtonContainer, Container, ImageContainer, Navbar } from 'components';
import { respondSurvey } from 'graphql/operations/mutations';
import { useRespondSurveyOptions } from 'graphql/operations/mutations/options';
import { GetSurveyIRespond } from 'graphql/operations/queries';
import { useMutation } from 'graphql/utils';
import { respondOwnSurvey } from 'illustrations';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useRecoilTransaction, useUser } from 'utils/hooks';
import { Question } from './components';
import * as atoms from './recoil/atoms';
import * as callbacks from './recoil/callbacks';

interface RespondSurveyParams {
	id: string;
}

const RespondSurvey: React.FC = () => {
	const params = useParams<RespondSurveyParams>();
	const result = useRecoilValue(GetSurveyIRespond(params));
	const isResponseValid = useRecoilValue(atoms.isResponseValid(params.id));
	const response = useRecoilValue(atoms.responses(params.id));
	const resetData = useRecoilTransaction(callbacks.resetData, [params.id]);
	const respondSurveyOptions = useRespondSurveyOptions(resetData);
	const [send, { loading: sending }] = useMutation(respondSurvey, respondSurveyOptions);
	const [user] = useUser();
	const isMySurvey = result.surveyIRespond.userId === user?.uid;
	const alreadyResponded = result.surveyIRespond.questions.some(({ answers }) => answers.length);
	const closed = !!result.surveyIRespond.closedAt;

	if (isMySurvey) {
		return (
			<Container>
				<Navbar title={result.surveyIRespond.title} />
				<ImageContainer src={respondOwnSurvey} text="Não é possível responder sua própria pesquisa" />
			</Container>
		);
	}
	if (alreadyResponded) {
		return (
			<Container>
				<Navbar title={result.surveyIRespond.title} />
				<ImageContainer src={respondOwnSurvey} text="Você já respondeu a essa pesquisa" />
			</Container>
		);
	}
	if (closed) {
		return (
			<Container>
				<Navbar title={result.surveyIRespond.title} />
				<ImageContainer src={respondOwnSurvey} text="Essa pesquisa foi encerrada" />
			</Container>
		);
	}

	return (
		<Container>
			<Navbar title={result.surveyIRespond.title} />
			{result.surveyIRespond.questions.map((question, index) => (
				<Question key={question.id} question={question} index={index} />
			))}
			<ButtonContainer>
				{isResponseValid && (
					<Button disabled={sending} color="success" onClick={() => send({ response })}>
						Enviar
					</Button>
				)}
			</ButtonContainer>
		</Container>
	);
};

RespondSurvey.displayName = 'RespondSurvey';

export default RespondSurvey;
