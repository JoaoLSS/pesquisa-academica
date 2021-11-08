import { Button, TextField } from '@material-ui/core';
import { Google } from '@material-ui/icons';
import { useRef } from 'react';
import { useAsyncFn } from 'utils/hooks';
import { Navbar, Separator, PasswordField } from 'components';
import { login } from 'illustrations';
import * as C from './styles';
import * as U from './utils';

const Login: React.FC = () => {
	// REFS
	const userRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	// CALLBACKS
	const [, loginWithGoogle] = useAsyncFn(U.loginWithGoogle);
	const [{ error }, loginWithCredentials] = useAsyncFn(U.loginWithCredentials({ userRef, passwordRef }));
	const [userError, passwordError] = U.checkErrors(error);
	return (
		<C.Container>
			<Navbar hide />
			<C.LoginPanel>
				<C.Title>Pesquisa Acadêmica</C.Title>
				<img src={login} alt="login_hero" />
				<C.LoginForm>
					<TextField inputRef={userRef} label="Email" error={userError} />
					<PasswordField inputRef={passwordRef} label="Senha" error={passwordError} />
					<Button onClick={loginWithCredentials}>Login</Button>
					<C.NotRegistered>
						Não tem cadastro? <a href="/signin">Registre-se</a>
					</C.NotRegistered>
					<Separator verticalSpace="10px" />
					<Button onClick={loginWithGoogle} startIcon={<Google />}>
						Login com Google
					</Button>
				</C.LoginForm>
			</C.LoginPanel>
		</C.Container>
	);
};

Login.displayName = 'Login';

export default Login;
