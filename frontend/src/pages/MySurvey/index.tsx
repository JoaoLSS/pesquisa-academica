import { useRecoilValue } from 'recoil';
import { Container, Navbar, Paper } from 'components';
import { GetMySurvey } from 'graphql/operations/queries';
import { useParams } from 'react-router';
import { Typography } from '@material-ui/core';
import { formatDate } from 'utils/common';
import { DatesContainer } from 'pages/MySurveys/styles';
import { Question } from './components';
import * as C from './styles';
import * as atoms from './recoil/atoms';

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
		</Container>
	);
};

MySurvey.displayName = 'MySurvey';

export default MySurvey;
