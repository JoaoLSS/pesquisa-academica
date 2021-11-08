import { GetAllMySurveys } from 'graphql/operations/queries/__generated__';

export const getStatus = ({ openedAt, closedAt }: NonNullable<GetAllMySurveys['mySurveys'][0]>) => {
	if (!openedAt && !closedAt) return 'Essa pesquisa ainda não foi aberta para respostas';
	if (openedAt && !closedAt) return 'Essa pesquisa está aberta para respostas';
	if (openedAt && closedAt) return 'Essa pesquisa foi encerrada';
	return 'Status deconhecido';
};

export const getChipColor = ({ openedAt, closedAt }: NonNullable<GetAllMySurveys['mySurveys'][0]>) => {
	if (!openedAt && !closedAt) return 'default';
	if (openedAt && !closedAt) return 'success';
	if (openedAt && closedAt) return 'warning';
	return 'error';
};
