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

const MySurvey: React.FC = () => (
  <div>
    <Navbar title="Survey" />
  </div>
);
MySurvey.displayName = 'MySurvey';

export default MySurvey;
