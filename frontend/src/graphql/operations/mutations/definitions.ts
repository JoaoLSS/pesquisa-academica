import { gql } from '@apollo/client';

export const createSurvey = gql`
	mutation createSurvey($survey: CreateSurveyInput!) {
		createSurvey(survey: $survey) {
			id
		}
	}
`;

export const openSurvey = gql`
	mutation openSurvey($id: ID!) {
		openSurvey(id: $id) {
			id
		}
	}
`;

export const closeSurvey = gql`
	mutation closeSurvey($id: ID!) {
		closeSurvey(id: $id) {
			id
		}
	}
`;
