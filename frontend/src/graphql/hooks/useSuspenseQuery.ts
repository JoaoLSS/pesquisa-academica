import { selectorFamily, useRecoilValue } from 'recoil'
import { DocumentNode } from "apollo-link";
import client from '../setup'
import { ApolloQueryResult, OperationVariables, } from '@apollo/client';
import { v4 as uuid } from 'uuid'

interface QueryProps {
    queryId: string
    variables: OperationVariables
}

const query_id = new Map<DocumentNode,string>()

const getIdfromQuery = (query: DocumentNode) => {
    if(query_id.has(query)) {
        return query_id.get(query)!
    }
    const id = uuid()
    query_id.set(query,id)
    return id
}

const getQueryFromId = (id: string) => {
    return Array.from(query_id.entries()).find(([,_id]) => _id === id)?.[0]
}

const querySelectorFamily = selectorFamily<ApolloQueryResult<any>,Readonly<QueryProps>>({
    key: 'QUERY-SELECTOR-FAMILY',
    get: ({ queryId, variables }) => async () => {
        const query = getQueryFromId(queryId)
        if(!query) throw new Error('Query not found')
        const result = await client.query({ query, variables })
        return result.data
    }
})

export const useQuery = <TData = any, TVariables = OperationVariables>(query: DocumentNode, variables: TVariables) => {
    const queryId = getIdfromQuery(query)
    return useRecoilValue(querySelectorFamily({ queryId, variables })) as unknown as TData
}