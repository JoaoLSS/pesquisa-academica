import { selectorFamily } from 'recoil'
import { DocumentNode } from "apollo-link";
import client from '../setup'
import { OperationVariables, QueryHookOptions, QueryResult } from '@apollo/client';
import { v4 as uuid } from 'uuid'

interface QueryProps<TData = any, TVariables = OperationVariables> {
    query: string
    options?: QueryHookOptions<TData,TVariables>
}

const queryIDS = new Map<DocumentNode,string>()

const getQueryID = (query: DocumentNode) => {
    if(queryIDS.has(query)) {
        return queryIDS.get(query)
    }
    else {
        const id = Math.random().toString(64)
    }
}

const querySelectorFamily = selectorFamily<QueryResult<any,any>,Readonly<QueryProps<any,any>>>({
    key: 'QUERY-SELECTOR-FAMILY'
})