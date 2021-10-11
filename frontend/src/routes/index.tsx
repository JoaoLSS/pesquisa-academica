import UnloggedRoutes from "./UnloggedRoutes"
import LoggedRoutes from "./LoggedRoutes"
import { useUser } from "../utils/hooks/useUser"
import { BrowserRouter as Router } from "react-router-dom"

const Routes: React.FC = () => {
    const user = useUser()
    console.log({ user })
    return <Router>{user ? <LoggedRoutes/> : <UnloggedRoutes/>}</Router>
}

Routes.displayName = 'Routes'

export default Routes