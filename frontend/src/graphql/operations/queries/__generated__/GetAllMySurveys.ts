/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllMySurveys
// ====================================================

export interface GetAllMySurveys_mySurveys_questions {
  __typename: "Question";
  id: string;
}

export interface GetAllMySurveys_mySurveys {
  __typename: "Survey";
  id: string;
  createdAt: any;
  questions: GetAllMySurveys_mySurveys_questions[];
}

export interface GetAllMySurveys {
  mySurveys: (GetAllMySurveys_mySurveys | null)[];
}
