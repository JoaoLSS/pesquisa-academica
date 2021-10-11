/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMySurvey
// ====================================================

export interface GetMySurvey_mySurvey_questions {
  __typename: "Question";
  id: string;
}

export interface GetMySurvey_mySurvey {
  __typename: "Survey";
  id: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
  openedAt: any | null;
  closedAt: any | null;
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
