/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurveyIRespond
// ====================================================

export interface GetSurveyIRespond_mySurvey_questions {
  __typename: "Question";
  id: string;
}

export interface GetSurveyIRespond_mySurvey {
  __typename: "Survey";
  id: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
  openedAt: any | null;
  closedAt: any | null;
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
