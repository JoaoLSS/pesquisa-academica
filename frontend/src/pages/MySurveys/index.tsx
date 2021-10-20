import { useParams } from 'react-router';
import { Navbar } from '../../components';
import { useQuery } from '../../graphql/hooks';
import {
  GET_SURVEYS_I_RESPONDED,
  Types,
} from '../../graphql/operations/queries';

interface RouteParams {
  id: string;
}

const MySurveys: React.FC = () => (
  <div>
    <Navbar title="Surveys" />
  </div>
);
MySurveys.displayName = 'MySurveys';

export default MySurveys;
