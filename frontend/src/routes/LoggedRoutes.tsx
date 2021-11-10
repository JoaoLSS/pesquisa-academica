import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from 'pages';

const LoggedRoutes: React.VFC = () => (
	<Switch>
		<Redirect from="/" to="/surveys" exact />
		<Route path="/surveys" exact>
			<Pages.MySurveys />
		</Route>
		<Route path="/surveys/new" exact>
			<Pages.CreateSurvey />
		</Route>
		<Route path="/surveys/:id">
			<Pages.MySurvey />
		</Route>
		<Route path="/respond/:id">
			<Pages.RespondSurvey />
		</Route>
		<Redirect from="/login" to="/surveys" />
		<Redirect from="/signin" to="/surveys" />
		<Route path="*">
			<Pages.NotFound />
		</Route>
	</Switch>
);

LoggedRoutes.displayName = 'LoggedRoutes';

export default LoggedRoutes;
