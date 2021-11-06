import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from 'pages';

const LoggedRoutes: React.VFC = () => (
	<Switch>
		<Route path="/surveys" exact>
			<Pages.MySurveys />
		</Route>
		<Route path="/surveys/new" exact>
			<Pages.CreateSurvey />
		</Route>
		<Route path="/surveys/:id">
			<Pages.MySurvey />
		</Route>
		<Redirect from="/login" to="/surveys" />
		<Redirect from="/signin" to="/surveys" />
		<Redirect from="*" to="/notfound" />
	</Switch>
);

LoggedRoutes.displayName = 'LoggedRoutes';

export default LoggedRoutes;
