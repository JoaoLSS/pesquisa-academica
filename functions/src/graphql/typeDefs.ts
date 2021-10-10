import {gql} from "apollo-server-cloud-functions";

export default gql`

  scalar DateTime

  type Survey {
    id: ID!
    userId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    openedAt: DateTime
    closedAt: DateTime
    title: String!
    slug: String!
    questions: [Question!]!
  }

  type Question {
    id: ID!
    survey: Survey!
    surveyId: Int!
    text: String!
    slug: String!
    index: Int!
    alternatives: [Alternative!]!
    answers: [Answer]!
  }

  type Alternative {
    id: ID!
    question: Question!
    questionId: Int!
    text: String!
    slug: String!
    index: Int!
    answers: [Answer]!
  }

  type Answer {
    id: ID!
    question: Question!
    questionId: Int!
    alternative: Alternative!
    alternativeId: Int!
    userId: String!
  }

  type Query {
    mySurvey(id: ID!): Survey!
    surveyIRespond(id: ID!): Survey!
    mySurveys: [Survey]!
    surveysIResponded: [Survey]!
  }
`;
