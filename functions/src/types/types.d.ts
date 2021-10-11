import {PrismaClient} from "@prisma/client";
import * as admin from "firebase-admin";

declare global {
    export interface Context {
        dataSources: {
            prisma: PrismaClient
        }
        user?: admin.auth.DecodedIdToken
    }

    export type Resolver<A = unknown, P = undefined> = (
        parent: P,
        args: A,
        context: Context
    ) => void
}
