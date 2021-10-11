import { gql } from '@apollo/client'
export * as Types from './__generated__'

export const GET_ALL_MY_SURVEYS = gql`
    query GetAllMySurveys {
        mySurveys {
            id
            createdAt
            questions {
                id
            }
        }
    }
`

export const GET_SURVEYS_I_RESPONDED = gql`
    query GetSurveysIResponded {
        surveysIResponded {
            id
            createdAt
            questions {
                id
            }
        }
    }
`

export const GET_MY_SURVEY = gql`
    query GetMySurvey($id: ID!) {
        mySurvey(id: $id) {
            id
            userId
            createdAt
            updatedAt
            openedAt
            closedAt
            title
            slug
            questions {
                id
            }
        }
    }
`

export const GET_SURVEY_I_RESPOND = gql`
    query GetSurveyIRespond($id: ID!) {
        mySurvey(id: $id) {
            id
            userId
            createdAt
            updatedAt
            openedAt
            closedAt
            title
            slug
            questions {
                id
            }
        }
    }
`