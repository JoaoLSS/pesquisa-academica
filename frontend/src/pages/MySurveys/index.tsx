import { Button, Container } from '@material-ui/core';
import { Navbar } from 'components';
import { GetAllMySurveys } from 'graphql/operations/queries';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';

const MySurveys: React.VFC = () => {
	const result = useRecoilValue(GetAllMySurveys);
	const history = useHistory();
	return (
		<Container>
			<Navbar title="Minhas Pesquisas" />
			{!result.mySurveys.length && 'Você ainda não criou nenhuma pesquisa'}
			<Button onClick={() => history.push('/surveys/new')}>Nova Pesquisa</Button>
		</Container>
	);
};
MySurveys.displayName = 'MySurveys';

export default MySurveys;
