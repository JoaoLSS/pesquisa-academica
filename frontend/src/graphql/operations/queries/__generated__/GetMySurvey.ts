/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMySurvey
// ====================================================

export interface GetMySurvey_mySurvey_questions_alternatives {
  __typename: "Alternative";
  id: string;
  text: string;
  index: number;
}

export interface GetMySurvey_mySurvey_questions_answers {
  __typename: "Answer";
  id: string;
  alternativeId: number;
}

export interface GetMySurvey_mySurvey_questions {
  __typename: "Question";
  id: string;
  text: string;
  index: number;
  alternatives: GetMySurvey_mySurvey_questions_alternatives[];
  answers: (GetMySurvey_mySurvey_questions_answers | null)[];
}

export interface GetMySurvey_mySurvey {
  __typename: "SurveyWithQuestions";
  id: string;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  openedAt: DateTime | null;
  closedAt: DateTime | null;
  title: string;
  slug: string;
  questions: GetMySurvey_mySurvey_questions[];
}

export interface GetMySurvey {
  mySurvey: GetMySurvey_mySurvey;
}

export interface GetMySurveyVariables {
  id: string;
}
