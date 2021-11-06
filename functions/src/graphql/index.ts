/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloServer } from 'apollo-server-cloud-functions';
import { PrismaClient } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import * as admin from 'firebase-admin';

admin.initializeApp();

export default new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		prisma: new PrismaClient() as DataSource,
	}),
	context: async ({ req }) => {
		const token = (req.headers.authorization || '').split(' ')[1];
		if (token) {
			const user = await admin.auth().verifyIdToken(token);
			return { user };
		}
		return {};
	},
});
