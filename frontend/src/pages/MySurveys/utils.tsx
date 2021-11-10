import { Typography } from '@material-ui/core';
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

export const pluralizeQuestions = (n: number) => {
	if (n === 0) return 'nenhuma questão';
	if (n === 1) return '1 questão';
	return `${n} questões`;
};

export const dateAt = (...strs: string[]) => strs.map((str) => <Typography key={str}>{str}</Typography>);
