import { TypedDocumentNode } from '@apollo/client';
import * as Q from './definitions';
import * as T from './__generated__';

export const createSurvey = Q.createSurvey as TypedDocumentNode<T.createSurvey, T.createSurveyVariables>;
export const openSurvey = Q.openSurvey as TypedDocumentNode<T.openSurvey, T.openSurveyVariables>;
export const closeSurvey = Q.closeSurvey as TypedDocumentNode<T.closeSurvey, T.closeSurveyVariables>;
