import { TypedDocumentNode } from '@apollo/client';
import { RecoilValueReadOnly } from 'recoil';

declare global {
	export type DateTime = string;

	interface GQLValue<R> extends RecoilValueReadOnly<R> {
		query: TypedDocumentNode<R>;
	}

	interface GQLFamily<V, R> {
		(variables: Readonly<V>): RecoilValueReadOnly<R>;
		query: TypedDocumentNode<R, V>;
	}

	export type GQL_QUERY<R, V = void> = V extends void ? GQLValue<R> : GQLFamily<V, R>;
}
