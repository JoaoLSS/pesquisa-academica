import { Button, Chip, Typography } from '@material-ui/core';
import { Navbar, Container, ButtonContainer, StepCard, ImageContainer, useSnackbar } from 'components';
import { GetAllMySurveys } from 'graphql/operations/queries';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { noSurveys } from 'illustrations';
import { booleanFilter, formatDate, preventDefault } from 'utils/common';
import { useMutation } from 'graphql/utils';
import { closeSurvey, openSurvey } from 'graphql/operations/mutations';
import { useCloseSurveyOptions, useOpenSurveyOptions } from 'graphql/operations/mutations/options';
import { useCallback } from 'react';
import * as C from './styles';
import * as K from './constants';
import { getChipColor, getStatus } from './utils';

const pluralizeQuestions = (n: number) => {
	if (n === 0) return 'nenhuma questão';
	if (n === 1) return '1 questão';
	return `${n} questões`;
};

const dateAt = (...strs: string[]) => strs.map((str) => <Typography key={str}>{str}</Typography>);

const MySurveys: React.VFC = () => {
	const result = useRecoilValue(GetAllMySurveys);
	const openSurveyOptions = useOpenSurveyOptions();
	const [open, { loading: opening }] = useMutation(openSurvey, openSurveyOptions);
	const closeSurveyOptions = useCloseSurveyOptions();
	const [close, { loading: closing }] = useMutation(closeSurvey, closeSurveyOptions);
	const history = useHistory();
	const snackbar = useSnackbar();
	const copyToClipboard = useCallback((id: string) => {
		navigator.clipboard.writeText(`${window.location.protocol}://${window.location.host}/respond/${id}`);
		snackbar({
			severity: 'success',
			message: 'A URL da pesquisa foi copiada para sua area de transferencia!',
		});
	}, []);
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
						<Typography>{pluralizeQuestions(survey.questionsCount)}</Typography>
						<C.DatesContainer>
							{dateAt('criada em:', formatDate(survey.createdAt))}
							{dateAt('aberta em:', formatDate(survey.openedAt))}
							{dateAt('encerrada em:', formatDate(survey.closedAt))}
						</C.DatesContainer>
						<Chip color={getChipColor(survey)} size="small" label={getStatus(survey)} />
						<ButtonContainer justify="flex-start">
							{!survey.openedAt && (
								<Button
									disabled={opening}
									onClick={preventDefault(() => !opening && open({ id: survey.id }))}
								>
									Abrir
								</Button>
							)}
							{survey.openedAt && !survey.closedAt && (
								<Button onClick={preventDefault(() => copyToClipboard(survey.id))}>Compartilhar</Button>
							)}
							{survey.openedAt && !survey.closedAt && (
								<Button
									color="error"
									disabled={closing}
									onClick={preventDefault(() => !closing && close({ id: survey.id }))}
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
