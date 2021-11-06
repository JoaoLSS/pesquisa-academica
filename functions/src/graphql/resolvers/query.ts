import { ApolloError, AuthenticationError } from 'apollo-server-cloud-functions';
import * as V from '../../validators';

type MySurveyResolver = Resolver<V.MySurvey.Result, { id: string }>;
export const mySurvey: MySurveyResolver = async (_, { id }, { dataSources: { prisma }, user }) => {
	if (!user) throw new AuthenticationError('user is not authenticated');
	const survey = await prisma.survey.findFirst(V.MySurvey.options(Number(id), user.uid));
	if (!survey) throw new ApolloError('survey not found', '404');
	return survey;
};

type SurveyIRespondResolver = Resolver<V.SurveyIRespond.Result, { id: string }>;
export const surveyIRespond: SurveyIRespondResolver = async (_, { id }, { dataSources: { prisma }, user }) => {
	if (!user) throw new AuthenticationError('user is not authenticated');
	const survey = await prisma.survey.findFirst(V.SurveyIRespond.options(Number(id), user.uid));
	if (!survey) throw new ApolloError('survey not found', '404');
	return survey;
};

type MySurveysResolver = Resolver<V.MySurveys.Result[], never>;
export const mySurveys: MySurveysResolver = async (_, __, { dataSources: { prisma }, user }) => {
	if (!user) throw new AuthenticationError('user is not authenticated');
	return await prisma.survey.findMany(V.MySurveys.options(user.uid));
};

type SurveysIRespondedResolver = Resolver<V.SurveysIResponded.Result[], never>;
export const surveysIResponded: SurveysIRespondedResolver = async (_, __, { dataSources: { prisma }, user }) => {
	if (!user) throw new AuthenticationError('user is not authenticated');
	return await prisma.survey.findMany(V.SurveysIResponded.options(user.uid));
};
