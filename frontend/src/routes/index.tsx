import { BrowserRouter as Router } from 'react-router-dom';
import UnloggedRoutes from './UnloggedRoutes';
import LoggedRoutes from './LoggedRoutes';
import { useUser } from '../utils/hooks/useUser';

const Routes: React.FC = () => {
  const [user] = useUser();
  return <Router>{user ? <LoggedRoutes /> : <UnloggedRoutes />}</Router>;
};

Routes.displayName = 'Routes';

export default Routes;
