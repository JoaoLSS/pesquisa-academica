import { Prisma } from '@prisma/client';
import { v } from '../utils';

const include = v<Prisma.SurveyInclude>()({
	questions: {
		include: {
			alternatives: true,
			answers: true,
		},
	},
});

const where = (id: number, userId: string) => v<Prisma.SurveyWhereInput>()({ id, userId });

export const options = (id: number, userId: string) => ({
	include,
	where: where(id, userId),
});

export type Result = Prisma.SurveyGetPayload<Include<typeof include>>;
