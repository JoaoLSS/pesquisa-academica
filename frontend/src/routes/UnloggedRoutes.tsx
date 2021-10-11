import { Route, Redirect, Switch } from 'react-router-dom'
import * as Pages from '../pages'

const UnloggedRoutes: React.FC = () => 
<Switch>
    <Route path='/login'>
        <Pages.Login/>
    </Route>
    <Redirect from='*' to='/login'/>
</Switch>

UnloggedRoutes.displayName = 'UnloggedRoutes'

export default UnloggedRoutes