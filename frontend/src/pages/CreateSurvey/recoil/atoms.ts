/* eslint-disable no-underscore-dangle */
import { atom, atomFamily, selector } from 'recoil';

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
