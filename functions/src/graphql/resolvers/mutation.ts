import { Survey } from '@prisma/client';
import { ApolloError, ForbiddenError } from 'apollo-server-errors';
import slugify from 'slugify';
import * as V from '../../validators';

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

type OpenSurveyResolver = Resolver<Survey, { id: string }>;
export const openSurvey: OpenSurveyResolver = async (_, { id }, { dataSources: { prisma }, user }) => {
	if (!user) throw new ForbiddenError('user must be logged to open survey');
	let survey = await prisma.survey.findFirst({
		where: {
			id: Number(id),
			userId: user.uid,
		},
	});
	if (survey) {
		survey = await prisma.survey.update({
			data: {
				openedAt: new Date(),
			},
			where: {
				id: Number(id),
			},
		});
	} else {
		throw new ApolloError('survey not found', '404');
	}
	return survey;
};

type CloseSurveyResolver = Resolver<Survey, { id: string }>;
export const closeSurvey: CloseSurveyResolver = async (_, { id }, { dataSources: { prisma }, user }) => {
	if (!user) throw new ForbiddenError('user must be logged to close survey');
	let survey = await prisma.survey.findFirst({
		where: {
			id: Number(id),
			userId: user.uid,
			openedAt: {
				not: null,
			},
		},
	});
	if (survey) {
		survey = await prisma.survey.update({
			data: {
				closedAt: new Date(),
			},
			where: {
				id: Number(id),
			},
		});
	} else {
		throw new ApolloError('survey not found', '404');
	}
	return survey;
};

type RespondSurveyResolver = Resolver<Survey, RespondSurveyArgs>;
export const respondSurvey: RespondSurveyResolver = async (_, { response }, { dataSources: { prisma }, user }) => {
	if (!user) throw new ForbiddenError('user must be logged to respond a survey');
	// CHECK VALIDITY OF RESPONSE
	const survey = await prisma.survey.findFirst(V.SurveyIRespond.options(Number(response.id), user.uid));
	if (!survey) throw new ApolloError('survey doesnt exist', '404');
	survey.questions.forEach((question) => {
		const questionResponse = response.questions.find((q) => Number(q.id) === question.id);
		if (!questionResponse) throw new ApolloError('missing question', '400');
		if (!questionResponse.answer) throw new ApolloError('missing response', '400');
	});
	await prisma.answer.createMany({
		data: response.questions.map((question) => ({
			alternativeId: Number(question.answer.alternativeId),
			questionId: Number(question.id),
			userId: user.uid,
		})),
	});
	return survey;
};
