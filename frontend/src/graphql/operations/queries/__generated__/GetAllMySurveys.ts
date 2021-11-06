/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllMySurveys
// ====================================================

export interface GetAllMySurveys_mySurveys {
  __typename: "SurveyWithoutQuestions";
  id: string;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  openedAt: DateTime | null;
  closedAt: DateTime | null;
  title: string;
  slug: string;
  questionsCount: number;
}

export interface GetAllMySurveys {
  mySurveys: (GetAllMySurveys_mySurveys | null)[];
}
