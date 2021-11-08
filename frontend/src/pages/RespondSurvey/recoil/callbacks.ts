import { GetSurveyIRespond } from 'graphql/operations/queries';
import { TransactionCreator } from 'utils/hooks';
import * as atoms from './atoms';

export const resetData: TransactionCreator<string, [string]> =
	(id) =>
	({ get, reset }) =>
	() => {
		const { surveyIRespond } = get(GetSurveyIRespond({ id }));
		surveyIRespond.questions.forEach((question) => reset(atoms.questionResponse(question.id)));
	};
