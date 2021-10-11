import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import Routes from './routes'
import client from './graphql/setup';
import { Suspense } from 'react';

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Suspense fallback={<span/>}>
          <Routes/>
        </Suspense>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
