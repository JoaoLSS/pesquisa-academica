/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSurveyInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createSurvey
// ====================================================

export interface createSurvey_createSurvey {
  __typename: "Survey";
  id: string;
}

export interface createSurvey {
  createSurvey: createSurvey_createSurvey;
}

export interface createSurveyVariables {
  survey: CreateSurveyInput;
}
