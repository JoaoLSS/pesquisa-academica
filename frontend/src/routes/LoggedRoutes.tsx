import { Route, Redirect, Switch } from 'react-router-dom'
import * as Pages from '../pages'

const LoggedRoutes: React.FC = () => {
    console.log('logged routes')
    return <Switch>
        <Route path='/survey/:id'>
            <Pages.MySurvey/>
        </Route>
        <Redirect from="*" to="/notfound"/>
    </Switch>
}

LoggedRoutes.displayName = 'LoggedRoutes'

export default LoggedRoutes