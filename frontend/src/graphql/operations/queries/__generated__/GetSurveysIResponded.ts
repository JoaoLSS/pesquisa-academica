/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurveysIResponded
// ====================================================

export interface GetSurveysIResponded_surveysIResponded {
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

export interface GetSurveysIResponded {
  surveysIResponded: (GetSurveysIResponded_surveysIResponded | null)[];
}
