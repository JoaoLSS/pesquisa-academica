import { useRecoilValue } from 'recoil';
import { Navbar } from 'components';
import { GetMySurvey } from 'graphql/operations/queries';
import { useParams } from 'react-router';

interface RouteParams {
	id: string;
}

const MySurvey: React.VFC = () => {
	const params = useParams<RouteParams>();
	const result = useRecoilValue(GetMySurvey(params));
	return (
		<div>
			<Navbar title={result.mySurvey.title} />
		</div>
	);
};

MySurvey.displayName = 'MySurvey';

export default MySurvey;
