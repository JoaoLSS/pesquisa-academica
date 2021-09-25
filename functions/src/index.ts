import * as functions from "firebase-functions";
import GraphQLServer from "./graphql";
import PrismaMigrate from "./prismaMigrate";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const graphql = functions.https.onRequest(GraphQLServer.createHandler());
export const updatePrisma = functions.https.onRequest(PrismaMigrate);
