import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
	name: 'DateTime',
	description: 'DateTime custom scalar type',
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
