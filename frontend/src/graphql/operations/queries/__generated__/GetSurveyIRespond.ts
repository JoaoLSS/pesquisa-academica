/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurveyIRespond
// ====================================================

export interface GetSurveyIRespond_mySurvey_questions_alternatives {
  __typename: "Alternative";
  id: string;
  text: string;
  index: number;
}

export interface GetSurveyIRespond_mySurvey_questions {
  __typename: "Question";
  id: string;
  text: string;
  index: number;
  alternatives: GetSurveyIRespond_mySurvey_questions_alternatives[];
}

export interface GetSurveyIRespond_mySurvey {
  __typename: "SurveyWithQuestions";
  id: string;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  openedAt: DateTime | null;
  closedAt: DateTime | null;
  title: string;
  slug: string;
  questions: GetSurveyIRespond_mySurvey_questions[];
}

export interface GetSurveyIRespond {
  mySurvey: GetSurveyIRespond_mySurvey;
}

export interface GetSurveyIRespondVariables {
  id: string;
}
