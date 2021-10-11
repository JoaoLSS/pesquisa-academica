import {GraphQLScalarType, Kind} from "graphql";
import {ApolloError, AuthenticationError} from "apollo-server-cloud-functions";

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

type MySurvey = Resolver<{ id: string }>
const mySurvey: MySurvey = (_, {id}, {dataSources: {prisma}, user}) => {
  if (!user) throw new AuthenticationError("user is not authenticated");
  const survey = prisma.survey.findFirst({
    where: {id: Number(id), userId: user.uid},
    include: {
      questions: {
        include: {
          alternatives: true,
          answers: true,
        },
      },
    },
  });
  if (!survey) throw new ApolloError("survey not found", "404");
  return survey;
};

type SurveyIRespond = Resolver<{ id:string }>
const surveyIRespond: SurveyIRespond = (
    _,
    {id},
    {dataSources: {prisma}, user}
) => {
  if (!user) throw new AuthenticationError("user is not authenticated");
  const survey = prisma.survey.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      questions: {
        include: {
          alternatives: true,
          answers: {
            where: {
              userId: user.uid,
            },
          },
        },
      },
    },
  });
  if (!survey) throw new ApolloError("survey not found", "404");
  return survey;
};

type MySurveys = Resolver<never>
const mySurveys: MySurveys = (_, __, {dataSources: {prisma}, user}) => {
  if (!user) throw new AuthenticationError("user is not authenticated");
  return prisma.survey.findMany({
    where: {userId: user.uid},
    include: {
      questions: {
        include: {
          alternatives: true,
          answers: true,
        },
      },
    },
  });
};

type SurveysIResponded = Resolver<never>
const surveysIResponded: SurveysIResponded = (
    _,
    __,
    {dataSources: {prisma}, user}
) => {
  if (!user) throw new AuthenticationError("user is not authenticated");
  return prisma.survey.findMany({
    where: {
      questions: {
        some: {},
        every: {
          answers: {
            some: {
              userId: {
                equals: user.uid,
              },
            },
          },
        },
      },
    },
    include: {
      questions: {
        include: {
          alternatives: true,
          answers: {
            where: {
              userId: user.uid,
            },
          },
        },
      },
    },
  });
};

export default {
  DateTime,
  Query: {
    mySurvey,
    surveyIRespond,
    mySurveys,
    surveysIResponded,
  },
};
