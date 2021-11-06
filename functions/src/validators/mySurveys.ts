import { Prisma } from '@prisma/client';
import { v } from '../utils';

const include = v<Prisma.SurveyInclude>()({
	_count: {
		select: {
			questions: true,
		},
	},
});

const where = (userId: string) => v<Prisma.SurveyWhereInput>()({ userId });

export const options = (userId: string) => ({
	include,
	where: where(userId),
});

export type Result = Prisma.SurveyGetPayload<Include<typeof include>>;
