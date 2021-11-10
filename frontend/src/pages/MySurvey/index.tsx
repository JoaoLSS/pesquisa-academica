import { useRecoilValue } from 'recoil';
import { ButtonContainer, Container, Navbar, Paper } from 'components';
import { GetMySurvey } from 'graphql/operations/queries';
import { useParams } from 'react-router';
import { Button, Typography } from '@material-ui/core';
import { formatDate, preventDefault } from 'utils/common';
import { DatesContainer } from 'pages/MySurveys/styles';
import { useMutation } from 'graphql/utils';
import { useCloseSurveyOptions, useOpenSurveyOptions } from 'graphql/operations/mutations/options';
import { closeSurvey, openSurvey } from 'graphql/operations/mutations';
import { useShareSurvey } from 'utils/hooks';
import * as atoms from './recoil/atoms';
import * as C from './styles';
import { Question } from './components';

const pluralizeQuestions = (n: number) => {
	if (n === 0) return 'nenhuma questão';
	if (n === 1) return '1 questão';
	return `${n} questões`;
};

const pluaralizeResponses = (n: number) => {
	if (n === 0) return 'nenhuma resposta';
	if (n === 1) return '1 resposta';
	return `${n} respostas`;
};

const dateAt = (...strs: string[]) => strs.map((str) => <Typography key={str}>{str}</Typography>);

interface RouteParams {
	id: string;
}

const MySurvey: React.VFC = () => {
	const params = useParams<RouteParams>();
	const result = useRecoilValue(GetMySurvey(params));
	const responseCount = useRecoilValue(atoms.totalResponses(params.id));
	const openSurveyOptions = useOpenSurveyOptions();
	const [open, { loading: opening }] = useMutation(openSurvey, openSurveyOptions);
	const closeSurveyOptions = useCloseSurveyOptions();
	const [close, { loading: closing }] = useMutation(closeSurvey, closeSurveyOptions);
	const shareSurvey = useShareSurvey();
	return (
		<Container>
			<Navbar title={result.mySurvey.title} />
			<Paper>
				<C.ContentContainer>
					<Typography>{pluralizeQuestions(result.mySurvey.questions.length)}</Typography>
					<Typography>{pluaralizeResponses(responseCount)}</Typography>
					<DatesContainer>
						{dateAt('criada em:', formatDate(result.mySurvey.createdAt))}
						{dateAt('aberta em:', formatDate(result.mySurvey.openedAt))}
						{dateAt('encerrada em:', formatDate(result.mySurvey.closedAt))}
					</DatesContainer>
				</C.ContentContainer>
			</Paper>
			{result.mySurvey.questions.map((question, index) => (
				<Question surveyId={params.id} key={question.id} question={question} index={index} />
			))}
			<ButtonContainer>
				{!result.mySurvey.openedAt && (
					<Button disabled={opening} onClick={preventDefault(() => open({ id: result.mySurvey.id }))}>
						Abrir
					</Button>
				)}
				{result.mySurvey.openedAt && !result.mySurvey.closedAt && (
					<Button onClick={preventDefault(() => shareSurvey(result.mySurvey.id))}>Compartilhar</Button>
				)}
				{result.mySurvey.openedAt && !result.mySurvey.closedAt && (
					<Button
						color="error"
						disabled={closing}
						onClick={preventDefault(() => close({ id: result.mySurvey.id }))}
					>
						Encerrar
					</Button>
				)}
			</ButtonContainer>
		</Container>
	);
};

MySurvey.displayName = 'MySurvey';

export default MySurvey;
