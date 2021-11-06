/* eslint-disable camelcase */
import { filter } from 'utils/common';
import { TransactionCreator } from 'utils/hooks';
import * as atoms from './atoms';

export const excludeQuestion: TransactionCreator<string> =
	(questionID) =>
	({ get, set, reset }) =>
	() => {
		// RESET QUESTION RELATED ATOMS
		const alternativeIDs = get(atoms.alternativeIDs(questionID));
		alternativeIDs.forEach((id) => reset(atoms.alternativeTitle(id)));
		reset(atoms.questionTitle(questionID));
		reset(atoms.alternativeIDs(questionID));
		// REMOVE ID FROM ARRAY
		set(atoms.questionIDs, filter(questionID));
	};

export const excludeAlternative: TransactionCreator<string, [string, string]> =
	(questionID, alternativeID) =>
	({ set, reset }) =>
	() => {
		// RESET ALTERNATIVE RELATED ATOMS
		reset(atoms.alternativeTitle(alternativeID));
		// REMOVE ALTERNATIVE FROM ARRAY
		set(atoms.alternativeIDs(questionID), filter(alternativeID));
	};

export const resetAllData: TransactionCreator<never> =
	() =>
	({ get, reset }) =>
	() => {
		// RESET EACH QUESTION
		const questionIDs = get(atoms.questionIDs);
		questionIDs.forEach((questionID) => {
			const alternativeIDs = get(atoms.alternativeIDs(questionID));
			alternativeIDs.forEach((id) => reset(atoms.alternativeTitle(id)));
			reset(atoms.questionTitle(questionID));
			reset(atoms.alternativeIDs(questionID));
		});
		// RESET REMAINING INFO
		reset(atoms.questionIDs);
		reset(atoms.title);
	};
