import { Prisma } from '@prisma/client';

export const v = <T>() => Prisma.validator<T>();
