import {PrismaClient} from "@prisma/client";

declare global {
    export interface Context {
        dataSourcers: {
            prisma: PrismaClient
        }
    }

    export type Resolver<A = unknown, P = undefined> = (
        parent: P,
        args: A,
        context: Context
    ) => void
}
