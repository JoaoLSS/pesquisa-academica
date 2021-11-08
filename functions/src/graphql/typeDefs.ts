import { gql } from 'apollo-server-cloud-functions';

export default gql`
	scalar DateTime

	type Survey {
		id: ID!
		userId: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		openedAt: DateTime
		closedAt: DateTime
		title: String!
		slug: String!
	}

	type SurveyWithQuestions {
		id: ID!
		userId: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		openedAt: DateTime
		closedAt: DateTime
		title: String!
		slug: String!
		questions: [Question!]!
	}

	type SurveyWithoutQuestions {
		id: ID!
		userId: String!
		createdAt: DateTime!
		updatedAt: DateTime!
		openedAt: DateTime
		closedAt: DateTime
		title: String!
		slug: String!
		questionsCount: Int!
	}

	type Question {
		id: ID!
		survey: Survey!
		surveyId: Int!
		text: String!
		slug: String!
		index: Int!
		alternatives: [Alternative!]!
		answers: [Answer]!
	}

	type Alternative {
		id: ID!
		question: Question!
		questionId: Int!
		text: String!
		slug: String!
		index: Int!
		answers: [Answer]!
	}

	type Answer {
		id: ID!
		question: Question!
		questionId: Int!
		alternative: Alternative!
		alternativeId: Int!
		userId: String!
	}

	type Query {
		mySurvey(id: ID!): SurveyWithQuestions!
		surveyIRespond(id: ID!): SurveyWithQuestions!
		mySurveys: [SurveyWithoutQuestions]!
		surveysIResponded: [SurveyWithoutQuestions]!
	}

	input CreateSurveyInput {
		title: String!
		questions: [CreateQuestionInput!]!
	}

	input CreateQuestionInput {
		title: String!
		alternatives: [CreateAlternativeInput!]!
	}

	input CreateAlternativeInput {
		title: String!
	}

	input RespondSurveyInput {
		id: ID!
		questions: [RespondQuestionInput!]!
	}

	input RespondQuestionInput {
		id: ID!
		answer: RespondAnswerInput!
	}

	input RespondAnswerInput {
		alternativeId: ID!
	}

	type Mutation {
		createSurvey(survey: CreateSurveyInput!): Survey!
		openSurvey(id: ID!): Survey!
		closeSurvey(id: ID!): Survey!
		respondSurvey(response: RespondSurveyInput!): Survey!
	}
`;
