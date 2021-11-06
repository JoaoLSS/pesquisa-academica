import * as V from '../../validators';

type QuestionsCountResolver = Resolver<number, never, V.MySurveys.Result>;
export const questionsCount: QuestionsCountResolver = async (parent) => {
	return parent._count?.questions || 0;
};
