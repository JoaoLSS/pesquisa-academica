import { useSnackbar } from 'components';
import { useHistory } from 'react-router';
import { GetAllMySurveys } from '../queries';
import { GetSurveyIRespond } from '../queries/definitions';
import * as T from './options.types';

export const useCreateSurveyOptions = (resetData: () => void): T.CreateSurveyOptions => {
	const snackbar = useSnackbar();
	const history = useHistory();
	return {
		refetchQueries: [GetAllMySurveys.query],
		awaitRefetchQueries: true,
		onCompleted: (data) => {
			snackbar({ severity: 'success', message: 'Pesquisa criada com sucesso' });
			history.push(`/surveys/${data.createSurvey.id}`);
			resetData();
		},
		onError: (error) => {
			let message = 'Não foi possível criar a pesquisa';
			switch (error.message) {
				case 'survey must have title':
					message = 'É necessário colocar um título para a pesquisa';
					break;
				case 'survey must have questions':
					message = 'A pesquisa precisa ter ao menos uma questão';
					break;
				case 'all questions must have title':
					message = 'Todas as questões devem ter um texto';
					break;
				case 'all questions must have alternatives':
					message = 'Todas as questões devem ter ao menos uma alternativa';
					break;
				case 'all alternatives must have title':
					message = 'Todas as alternativas devem ter um texto';
					break;
				default:
					break;
			}
			snackbar({ severity: 'error', message });
		},
	};
};

export const useOpenSurveyOptions = (): T.OpenSurveyOptions => {
	const snackbar = useSnackbar();
	return {
		refetchQueries: [GetAllMySurveys.query],
		awaitRefetchQueries: true,
		onCompleted: (data) => {
			snackbar({ severity: 'success', message: `${data.openSurvey.title} agora está aberta para respostas` });
		},
		onError: () => {
			snackbar({ severity: 'error', message: 'Não foi possível abrir a pesquisa, tente novamente' });
		},
	};
};

export const useCloseSurveyOptions = (): T.CloseSurveyOptions => {
	const snackbar = useSnackbar();
	return {
		refetchQueries: [GetAllMySurveys.query],
		awaitRefetchQueries: true,
		onCompleted: (data) => {
			snackbar({ severity: 'success', message: `${data.closeSurvey.title} foi encerrada` });
		},
		onError: () => {
			snackbar({ severity: 'error', message: 'Não foi possível encerrar a pesquisa, tente novamente' });
		},
	};
};

export const useRespondSurveyOptions = (resetData: () => void): T.RespondSurveyOptions => {
	const snackbar = useSnackbar();
	const history = useHistory();
	return {
		refetchQueries: [GetAllMySurveys.query, GetSurveyIRespond.query],
		awaitRefetchQueries: true,
		onCompleted: (data) => {
			snackbar({ severity: 'success', message: 'Obrigado por responder a essa pesquisa' });
			history.push('/surveys');
			resetData();
		},
		onError: () => {
			snackbar({ severity: 'error', message: 'Não foi possível enviar as respostas, tente novamente' });
		},
	};
};
