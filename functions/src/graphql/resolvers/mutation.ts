import { Survey } from '@prisma/client';
import { ApolloError, ForbiddenError } from 'apollo-server-errors';
import slugify from 'slugify';

type CreateSurveyResolver = Resolver<Survey, CreateSurveyArgs>;
export const createSurvey: CreateSurveyResolver = async (_, { survey }, { dataSources: { prisma }, user }) => {
	if (!user) throw new ForbiddenError('user must be logged to create survey');
	// CHECK IF SURVEY HAS TITLE
	if (!survey.title) throw new ApolloError('survey must have title', '400');
	// CHECK IF SURVEY HAS QUESTIONS
	if (!survey.questions.length) throw new ApolloError('survey must have questions', '400');
	// CHECK EACH QUESTION
	survey.questions.forEach((question) => {
		// CHECK IF QUESTION HAS TITLE
		if (!question.title) throw new ApolloError('all questions must have title', '400');
		// CHECK IF QUESTION HAS ALTERNATIVES
		if (!question.alternatives.length) throw new ApolloError('all questions must have alternatives', '400');
		// CHECK EACH ALTERNATIVE
		question.alternatives.forEach((alternative) => {
			if (!alternative.title) throw new ApolloError('all alternatives must have title', '400');
		});
	});
	const _survey = await prisma.survey.create({
		data: {
			title: survey.title,
			userId: user.uid,
			slug: slugify(survey.title),
			questions: {
				create: survey.questions.map((question, qIndex) => ({
					index: qIndex,
					slug: slugify(question.title),
					text: question.title,
					alternatives: {
						create: question.alternatives.map((alternative, aIndex) => ({
							index: aIndex,
							slug: slugify(alternative.title),
							text: alternative.title,
						})),
					},
				})),
			},
		},
	});
	return _survey;
};
export const openSurvey = () => {
	return true;
};
export const closeSurvey = () => {
	return true;
};
export const respondSurvey = () => {
	return true;
};
