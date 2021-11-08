import { gql as apolloGql } from '@apollo/client';
import { atomFamily, atom, errorSelector } from 'recoil';
import client from '../setup';

export const gql = ([queryTemplate]: TemplateStringsArray) => {
	const [queryType, _queryName] = queryTemplate.trim().split(' ') as ['query' | 'mutation', string];
	const hasVariables = _queryName.includes('(');
	const queryName = _queryName.split('(')[0];
	const query = apolloGql([queryTemplate]);
	if (queryType !== 'query') {
		throw new Error('this gql constructor can only be used with query type');
	}
	if (hasVariables) {
		const af = atomFamily({
			key: `ATOM-FAMILY-${queryType}-${queryName}`,
			default: () => new Promise(() => null),
			effects_UNSTABLE: (variables) => [
				({ setSelf }) => {
					const observable = client.watchQuery({ query, variables });
					const subscription = observable.subscribe(
						({ data }) => setSelf(data),
						(error) => {
							throw error;
						},
					);
					return subscription.unsubscribe;
				},
			],
		});
		return Object.assign(af, { query });
	}
	const a = atom({
		key: `ATOM-${queryType}-${queryName}`,
		default: new Promise(() => null),
		effects_UNSTABLE: [
			({ setSelf }) => {
				const observable = client.watchQuery({ query });
				const subscription = observable.subscribe(
					({ data }) => setSelf(data),
					(error) => {
						throw error;
					},
				);
				return subscription.unsubscribe;
			},
		],
	});
	return Object.assign(a, { query });
};
