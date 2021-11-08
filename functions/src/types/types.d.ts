import { PrismaClient } from '@prisma/client';
import * as admin from 'firebase-admin';

declare global {
	export interface Context {
		dataSources: {
			prisma: PrismaClient;
		};
		user?: admin.auth.DecodedIdToken;
	}

	export type Resolver<R = unknown, A = unknown, P = undefined> = (parent: P, args: A, context: Context) => Promise<R>;

	export type Include<T> = Record<'include', T>;

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

	export interface CreateSurveyArgs {
		survey: CreateSurveyInput;
	}

	export interface RespondAnswerInput {
		alternativeId: string;
	}

	export interface RespondQuestionInput {
		id: string;
		answer: RespondAnswerInput;
	}

	export interface RespondSurveyInput {
		id: string;
		questions: RespondQuestionInput[];
	}

	export interface RespondSurveyArgs {
		response: RespondSurveyInput;
	}
}
