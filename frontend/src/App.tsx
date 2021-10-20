import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';
import Routes from './routes';
import client from './graphql/setup';
import { NavbarContainer } from './components';
import { ThemeProvider } from './themes';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <NavbarContainer>
            <Suspense fallback={<LinearProgress />}>
              <Routes />
            </Suspense>
          </NavbarContainer>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
