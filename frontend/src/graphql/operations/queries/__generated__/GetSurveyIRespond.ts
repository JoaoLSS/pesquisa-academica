/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurveyIRespond
// ====================================================

export interface GetSurveyIRespond_surveyIRespond_questions_alternatives {
  __typename: "Alternative";
  id: string;
  text: string;
  index: number;
}

export interface GetSurveyIRespond_surveyIRespond_questions_answers {
  __typename: "Answer";
  id: string;
  alternativeId: number;
}

export interface GetSurveyIRespond_surveyIRespond_questions {
  __typename: "Question";
  id: string;
  text: string;
  index: number;
  alternatives: GetSurveyIRespond_surveyIRespond_questions_alternatives[];
  answers: (GetSurveyIRespond_surveyIRespond_questions_answers | null)[];
}

export interface GetSurveyIRespond_surveyIRespond {
  __typename: "SurveyWithQuestions";
  id: string;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  openedAt: DateTime | null;
  closedAt: DateTime | null;
  title: string;
  slug: string;
  questions: GetSurveyIRespond_surveyIRespond_questions[];
}

export interface GetSurveyIRespond {
  surveyIRespond: GetSurveyIRespond_surveyIRespond;
}

export interface GetSurveyIRespondVariables {
  id: string;
}
