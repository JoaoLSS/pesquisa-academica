import { useSnackbar } from 'components';
import { useHistory } from 'react-router';
import { GetAllMySurveys } from '../queries';
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
			console.log({ error });
			let message = 'Não foi possível criar a pesquisa';
			switch (error.message) {
				case 'survey must have title':
					message = 'É necessário colocar um título para a pesquisa';
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
