import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from 'pages';

const UnloggedRoutes: React.VFC = () => (
	<Switch>
		<Route path="/login">
			<Pages.Login />
		</Route>
		<Route path="/signin">
			<Pages.Signin />
		</Route>
		<Redirect from="*" to="/login" />
	</Switch>
);

UnloggedRoutes.displayName = 'UnloggedRoutes';

export default UnloggedRoutes;
