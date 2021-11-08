import { Prisma } from '@prisma/client';
import { v } from '../utils';

const include = (userId: string) =>
	v<Prisma.SurveyInclude>()({
		questions: {
			include: {
				alternatives: true,
				answers: {
					where: {
						userId,
					},
				},
			},
		},
	});

const where = (id: number) =>
	v<Prisma.SurveyWhereInput>()({
		id,
		openedAt: {
			not: null,
		},
	});

export const options = (id: number, userId: string) => ({
	include: include(userId),
	where: where(id),
});

export type Result = Prisma.SurveyGetPayload<Include<ReturnType<typeof include>>>;
