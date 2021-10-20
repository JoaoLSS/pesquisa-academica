import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from '../pages';

const LoggedRoutes: React.FC = () => (
  <Switch>
    <Route path="/surveys" exact>
      <Pages.MySurveys />
    </Route>
    <Route path="/survey/:id">
      <Pages.MySurvey />
    </Route>
    <Redirect from="/login" to="/surveys" />
    <Redirect from="*" to="/notfound" />
  </Switch>
);

LoggedRoutes.displayName = 'LoggedRoutes';

export default LoggedRoutes;
