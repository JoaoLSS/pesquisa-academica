import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { getAuth } from "@firebase/auth";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL!,
  });

const authLink = setContext(async (_, { headers }) => {
    const token = await getAuth().currentUser?.getIdToken()
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

export default client