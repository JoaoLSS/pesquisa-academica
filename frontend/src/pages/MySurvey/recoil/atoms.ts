import { GetMySurvey } from 'graphql/operations/queries';
import { selectorFamily } from 'recoil';
import { booleanFilter } from 'utils/common';

interface QuestionTotalParams {
	surveyId: string;
	questionId: string;
}

export const totalResponses = selectorFamily<number, string>({
	key: 'MY-SURVEY-TOTAL-RESPONSES-SELECTOR-FAMILY',
	get:
		(id) =>
		({ get }) => {
			const { mySurvey } = get(GetMySurvey({ id }));
			return mySurvey.questions[0].answers.length;
		},
});

interface AlternativePercentage {
	text: string;
	percentage: number;
}

export const alternativesPercentage = selectorFamily<
	AlternativePercentage[],
	Readonly<QuestionTotalParams>
>({
	key: 'MY-SURVEY-ALTERNATIVES-PERCENTAGE-SELECTOR-FAMILY',
	get:
		(params) =>
		({ get }) => {
			const total = get(totalResponses(params.surveyId));
			const { mySurvey } = get(GetMySurvey({ id: params.surveyId }));
			const question = mySurvey.questions.find((q) => q.id === params.questionId);
			if (!question) return [];
			return question.alternatives.map((alternative) => {
				const answers = booleanFilter(question.answers).filter(
					(answer) => answer.alternativeId === Number(alternative.id),
				).length;
				const percentage = answers / total;
				return { ...alternative, percentage: Number.isNaN(percentage) ? 0 : percentage };
			});
		},
});
