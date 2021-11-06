/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateAlternativeInput {
  title: string;
}

export interface CreateQuestionInput {
  title: string;
  alternatives: CreateAlternativeInput[];
}

export interface CreateSurveyInput {
  title: string;
  questions: CreateQuestionInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
