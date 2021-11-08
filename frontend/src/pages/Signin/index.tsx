import { Button, TextField } from '@material-ui/core';
import { useRef } from 'react';
import { useAsyncFn } from 'utils/hooks';
import { Navbar, PasswordField } from 'components';
import { login } from 'illustrations';
import * as C from './styles';
import * as U from './utils';

const Signin: React.FC = () => {
	// REFS
	const fullNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const refs = { fullNameRef, emailRef, passwordRef, confirmPasswordRef };
	// Async Function
	const [{ error }, signIn] = useAsyncFn(U.signinWithCredentials(refs));
	const errors = U.checkErrors(error);
	return (
		<C.Container>
			<Navbar hide />
			<C.LoginPanel>
				<C.Title>Pesquisa Acadêmica</C.Title>
				<img src={login} alt="login_hero" />
				<C.SigninForm>
					<TextField inputRef={fullNameRef} label="Nome completo" error={errors[0]} />
					<TextField inputRef={emailRef} label="Email" error={errors[1]} />
					<PasswordField inputRef={passwordRef} label="Senha" error={errors[2]} />
					<PasswordField inputRef={confirmPasswordRef} label="Confirmar senha" error={errors[3]} />
					<Button onClick={signIn}>Cadastrar</Button>
					<C.AlreadyRegistered>
						Já tem cadastro? <a href="/login">Faça Login</a>
					</C.AlreadyRegistered>
				</C.SigninForm>
			</C.LoginPanel>
		</C.Container>
	);
};

Signin.displayName = 'Signin';

export default Signin;
