import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@firebase/auth';
import { SnackbarError, SnackbarReturn } from 'components';
import { FirebaseError } from 'firebase/app';

// CONSTANTS

const NO_EMAIL = 'O email precisa ser preenchido';
const NO_PASSWORD = 'A senha precisa ser preenchida';
const USER_NOT_FOUND = 'Esse usuário não existe, registre-se para acessar a plataforma';
const WRONG_PASSWORD = 'Senha incorreta';
const UNKNOWN_ERROR = 'Não foi possível autenticar utilizando essas credenciais';

// FIREBASE_ERRORS

const fbErrors: Record<string, string> = {
	'auth/user-not-found': USER_NOT_FOUND,
	'auth/wrong-password': WRONG_PASSWORD,
};

// LOGIN WITH GOOGLE

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
	try {
		const request = await signInWithPopup(getAuth(), googleProvider);
		return new SnackbarReturn(`autenticado como ${request.user.email}`);
	} catch (e) {
		throw new SnackbarError(UNKNOWN_ERROR);
	}
};

// LOGIN WITH CREDENTIALS

type Refs = Record<'userRef' | 'passwordRef', React.RefObject<HTMLInputElement>>;

export const loginWithCredentials = (refs: Refs) => async () => {
	const email = refs.userRef.current?.value;
	const password = refs.passwordRef.current?.value;
	if (!email) throw new SnackbarError(NO_EMAIL);
	if (!password) throw new SnackbarError(NO_PASSWORD);
	try {
		const request = await signInWithEmailAndPassword(getAuth(), email, password);
		return new SnackbarReturn(`autenticado como ${request.user.email}`);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error({ e });
		if (e instanceof FirebaseError && fbErrors[e.code]) {
			throw new SnackbarError(fbErrors[e.code]);
		}
		throw new SnackbarError(UNKNOWN_ERROR);
	}
};

// CHECK ERRORS

const emailErrors = [NO_EMAIL, USER_NOT_FOUND, UNKNOWN_ERROR];
const passwordErrors = [NO_PASSWORD, WRONG_PASSWORD, UNKNOWN_ERROR];

type ErrorsReturn = [boolean, boolean];

export const checkErrors = (error?: SnackbarError): ErrorsReturn => {
	if (!error) return [false, false];
	const fields = [emailErrors, passwordErrors];
	return fields.map((errors) => errors.includes(error.message)) as ErrorsReturn;
};
