/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RespondSurveyInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: respondSurvey
// ====================================================

export interface respondSurvey_respondSurvey {
  __typename: "Survey";
  id: string;
}

export interface respondSurvey {
  respondSurvey: respondSurvey_respondSurvey;
}

export interface respondSurveyVariables {
  response: RespondSurveyInput;
}
