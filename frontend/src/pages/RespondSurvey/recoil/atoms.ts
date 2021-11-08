import { GetSurveyIRespond } from 'graphql/operations/queries';
import { atomFamily, selectorFamily } from 'recoil';
import { RespondSurveyInput } from '../../../../__generated__/globalTypes';

export const questionResponse = atomFamily<string | null, string>({
	key: 'RESPOND-SURVEY-QUESTION-RESPONSE-ATOM-FAMILY',
	default: () => null,
});

export const isResponseValid = selectorFamily<boolean, string>({
	key: 'RESPOND-SURVEY-RESPONSE-VALIDATION',
	get:
		(id) =>
		({ get }) => {
			const {
				surveyIRespond: { questions },
			} = get(GetSurveyIRespond({ id }));
			if (questions.some((question) => !get(questionResponse(question.id)))) {
				return false;
			}
			return true;
		},
});

export const responses = selectorFamily<RespondSurveyInput, string>({
	key: 'RESPOND-SURVEY-RESPONSES-SELECTOR',
	get:
		(id) =>
		({ get }) => {
			const { surveyIRespond } = get(GetSurveyIRespond({ id }));
			const questions = surveyIRespond.questions.map((question) => ({
				id: question.id,
				answer: {
					alternativeId: get(questionResponse(question.id)) as string,
				},
			}));
			return { id, questions };
		},
});
