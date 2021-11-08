import { gql } from 'graphql/utils/modGraphql';

export const GetAllMySurveys = gql`
	query GetAllMySurveys {
		mySurveys {
			id
			userId
			createdAt
			updatedAt
			openedAt
			closedAt
			title
			slug
			questionsCount
		}
	}
`;

export const GetSurveysIResponded = gql`
	query GetSurveysIResponded {
		surveysIResponded {
			id
			userId
			createdAt
			updatedAt
			openedAt
			closedAt
			title
			slug
			questionsCount
		}
	}
`;

export const GetMySurvey = gql`
	query GetMySurvey($id: ID!) {
		mySurvey(id: $id) {
			id
			userId
			createdAt
			updatedAt
			openedAt
			closedAt
			title
			slug
			questions {
				id
				text
				index
				alternatives {
					id
					text
					index
				}
				answers {
					id
					alternativeId
				}
			}
		}
	}
`;

export const GetSurveyIRespond = gql`
	query GetSurveyIRespond($id: ID!) {
		surveyIRespond(id: $id) {
			id
			userId
			createdAt
			updatedAt
			openedAt
			closedAt
			title
			slug
			questions {
				id
				text
				index
				alternatives {
					id
					text
					index
				}
				answers {
					id
					alternativeId
				}
			}
		}
	}
`;
