/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurveysIResponded
// ====================================================

export interface GetSurveysIResponded_surveysIResponded_questions {
  __typename: "Question";
  id: string;
}

export interface GetSurveysIResponded_surveysIResponded {
  __typename: "Survey";
  id: string;
  createdAt: any;
  questions: GetSurveysIResponded_surveysIResponded_questions[];
}

export interface GetSurveysIResponded {
  surveysIResponded: (GetSurveysIResponded_surveysIResponded | null)[];
}
