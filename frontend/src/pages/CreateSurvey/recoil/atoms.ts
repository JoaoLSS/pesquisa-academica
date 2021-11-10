/* eslint-disable no-underscore-dangle */
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

export const title = atom({
	key: 'NEW-SURVEY-TITLE',
	default: '',
});

export const questionIDs = atom<string[]>({
	key: 'NEW-SURVEY-QUESTIONS-COUNT',
	default: [],
});

export const questionTitle = atomFamily<string, string>({
	key: 'NEW-SURVEY-QUESTION-TITLES-FAMILY',
	default: () => '',
});

export const alternativeIDs = atomFamily<string[], string>({
	key: 'NEW-SURVEY-ALTERNATIVE-COUNT-FAMILY',
	default: () => [],
});

export const alternativeTitle = atomFamily<string, string>({
	key: 'NEW-SURVEY-ALTERNATIVES-FAMILY',
	default: () => '',
});

export const survey = selector<Survey>({
	key: 'NEW-SURVEY-SELECTOR',
	get: ({ get }) => {
		const _title = get(title);
		const _questions = get(questionIDs).map((questionID) => {
			const _questionTitle = get(questionTitle(questionID));
			const _alternatives = get(alternativeIDs(questionID)).map((alternativeID) => {
				const _alternativeTitle = get(alternativeTitle(alternativeID));
				return { title: _alternativeTitle };
			});
			return { title: _questionTitle, alternatives: _alternatives };
		});
		return { title: _title, questions: _questions };
	},
});

// VALIDATION SELECTORS

export const isAlternativeValid = selectorFamily<boolean, string>({
	key: 'NEW-SURVEY-ALTERNATIVE-VALIDATION-SELECTOR',
	get:
		(id) =>
		({ get }) => {
			const _title = get(alternativeTitle(id));
			return !!_title.length;
		},
});

export const isQuestionValid = selectorFamily<boolean, string>({
	key: 'NEW-SURVEY-QUESTION-VALIDATION-SELECTOR',
	get:
		(id) =>
		({ get }) => {
			const _title = get(questionTitle(id));
			if (_title.length < 3) return false;
			const altIDs = get(alternativeIDs(id));
			if (altIDs.length < 2) return false;
			if (altIDs.some((altID) => !get(isAlternativeValid(altID)))) return false;
			return true;
		},
});

export const isSurveyValid = selector<boolean>({
	key: 'NEW-SURVEY-VALIDATION-SELECTOR',
	get: ({ get }) => {
		const _title = get(title);
		if (_title.length < 3) return false;
		const _questionIDs = get(questionIDs);
		if (!_questionIDs.length) return false;
		if (_questionIDs.some((questionID) => !get(isQuestionValid(questionID)))) return false;
		return true;
	},
});
