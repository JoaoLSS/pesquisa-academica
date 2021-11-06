import { useMutation as useMutationApollo, TypedDocumentNode, MutationHookOptions } from '@apollo/client';
import { useCallback } from 'react';

export const useMutation = <TData, TVariables>(
	mutation: TypedDocumentNode<TData, TVariables>,
	options?: MutationHookOptions<TData, TVariables>,
) => {
	const [_mutate, result] = useMutationApollo<TData, TVariables>(mutation, options);
	const mutate = useCallback((variables: TVariables) => _mutate({ variables }), []);
	return [mutate, result] as const;
};
