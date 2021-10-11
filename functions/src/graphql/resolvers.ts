import {GraphQLScalarType, Kind} from "graphql";
import * as functions from "firebase-functions";
import {ForbiddenError} from "apollo-server-cloud-functions";

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime custom scalar type",
  serialize(value: Date) {
    return value.toISOString();
  },
  parseValue(value: string) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

type Survey = Resolver<{ id: string }>
const mySurvey: Survey = (_, {id}, {dataSources: {prisma}, user}) => {
  functions.logger.info({user, id});
  if (!user) throw new ForbiddenError("user is not authenticated");
  return prisma.survey.findFirst({
    where: {id: Number(id), userId: user.uid},
    include: {
      questions: true,
    },
  });
};

export default {
  DateTime,
  Query: {
    mySurvey,
  },
};
