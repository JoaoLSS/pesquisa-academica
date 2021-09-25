/* eslint-disable @typescript-eslint/ban-ts-comment */
import {ApolloServer, gql} from "apollo-server-cloud-functions";
import {PrismaClient} from "@prisma/client";
import {DataSource} from "apollo-datasource";
import * as resolvers from "./resolvers";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  scalar DateTime

  type Survey {
    id: ID!
    userId: String
    createdAt: DateTime
    updatedAt: DateTime
    openedAt: DateTime
    closedAt: DateTime
    title: String
    slug: String
  }

  type Query {
    survey(id: ID!): Survey
  }
`;

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    prisma: new PrismaClient() as DataSource,
  }),
});
