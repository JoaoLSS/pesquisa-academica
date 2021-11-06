import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';
import Routes from './routes';
import client from './graphql/setup';
import { NavbarContainer, SnackbarProvider } from './components';
import { ThemeProvider } from './themes';

function App() {
	return (
		<Router>
			<RecoilRoot>
				<ThemeProvider>
					<ApolloProvider client={client}>
						<NavbarContainer>
							<SnackbarProvider>
								<Suspense fallback={<LinearProgress />}>
									<Routes />
								</Suspense>
							</SnackbarProvider>
						</NavbarContainer>
					</ApolloProvider>
				</ThemeProvider>
			</RecoilRoot>
		</Router>
	);
}

export default App;
