import { gql } from '@apollo/client'

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