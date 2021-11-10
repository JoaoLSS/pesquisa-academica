import { Button, Chip, Typography } from '@material-ui/core';
import { Navbar, Container, ButtonContainer, StepCard, ImageContainer } from 'components';
import { GetAllMySurveys } from 'graphql/operations/queries';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { noSurveys } from 'illustrations';
import { booleanFilter, formatDate, preventDefault } from 'utils/common';
import { useMutation } from 'graphql/utils';
import { closeSurvey, openSurvey } from 'graphql/operations/mutations';
import { useCloseSurveyOptions, useOpenSurveyOptions } from 'graphql/operations/mutations/options';
import { useShareSurvey } from 'utils/hooks';
import * as C from './styles';
import * as K from './constants';
import * as U from './utils';

const MySurveys: React.VFC = () => {
	const result = useRecoilValue(GetAllMySurveys);
	const openSurveyOptions = useOpenSurveyOptions();
	const [open, { loading: opening }] = useMutation(openSurvey, openSurveyOptions);
	const closeSurveyOptions = useCloseSurveyOptions();
	const [close, { loading: closing }] = useMutation(closeSurvey, closeSurveyOptions);
	const history = useHistory();
	const shareSurvey = useShareSurvey();
	return (
		<Container>
			<Navbar title="Minhas Pesquisas" />
			{!result.mySurveys.length && <ImageContainer src={noSurveys} text={K.NO_SURVEYS_TEXT} />}
			{booleanFilter(result.mySurveys).map((survey) => (
				<StepCard
					onClick={() => history.push(`/surveys/${survey.id}`)}
					key={survey.id}
					success={false}
					title={survey.title}
					stepNumber={Number(survey.id)}
				>
					<C.SurveyContainer>
						<Typography>{U.pluralizeQuestions(survey.questionsCount)}</Typography>
						<C.DatesContainer>
							{U.dateAt('criada em:', formatDate(survey.createdAt))}
							{U.dateAt('aberta em:', formatDate(survey.openedAt))}
							{U.dateAt('encerrada em:', formatDate(survey.closedAt))}
						</C.DatesContainer>
						<Chip color={U.getChipColor(survey)} size="small" label={U.getStatus(survey)} />
						<ButtonContainer justify="flex-start">
							{!survey.openedAt && (
								<Button disabled={opening} onClick={preventDefault(() => open({ id: survey.id }))}>
									Abrir
								</Button>
							)}
							{survey.openedAt && !survey.closedAt && (
								<Button onClick={preventDefault(() => shareSurvey(survey.id))}>Compartilhar</Button>
							)}
							{survey.openedAt && !survey.closedAt && (
								<Button
									color="error"
									disabled={closing}
									onClick={preventDefault(() => close({ id: survey.id }))}
								>
									Encerrar
								</Button>
							)}
						</ButtonContainer>
					</C.SurveyContainer>
				</StepCard>
			))}
			<ButtonContainer>
				<Button onClick={() => history.push('/surveys/new')}>Nova Pesquisa</Button>
			</ButtonContainer>
		</Container>
	);
};
MySurveys.displayName = 'MySurveys';

export default MySurveys;
