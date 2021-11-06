import UnloggedRoutes from './UnloggedRoutes';
import LoggedRoutes from './LoggedRoutes';
import { useUser } from '../utils/hooks/useUser';

const Routes: React.VFC = () => {
	const [user] = useUser();
	return user ? <LoggedRoutes /> : <UnloggedRoutes />;
};

Routes.displayName = 'Routes';

export default Routes;
