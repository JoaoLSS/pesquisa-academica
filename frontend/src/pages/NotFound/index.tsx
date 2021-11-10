import { Button } from '@material-ui/core';
import { Navbar, Container, ImageContainer, ButtonContainer } from 'components';
import { notFound } from 'illustrations';
import { useHistory } from 'react-router';

const NotFound: React.VFC = () => {
	const history = useHistory();
	return (
		<Container>
			<Navbar hide />
			<ImageContainer src={notFound} text="Essa página não existe." />
			<ButtonContainer>
				<Button onClick={() => history.push('/')}>Voltar</Button>
			</ButtonContainer>
		</Container>
	);
};
NotFound.displayName = 'NotFound';

export default NotFound;
