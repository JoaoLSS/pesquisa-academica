/* eslint-disable @typescript-eslint/ban-ts-comment */
import {ApolloServer} from "apollo-server-cloud-functions";
import {PrismaClient} from "@prisma/client";
import {DataSource} from "apollo-datasource";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    prisma: new PrismaClient() as DataSource,
  }),
});
