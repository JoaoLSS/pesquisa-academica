import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { SnackbarError, SnackbarReturn } from 'components';

// ERROR_CONSTANTS

const NO_FULL_NAME = 'O nome completo precisa ser preenchido';
const NO_EMAIL = 'O email precisa ser preenchido';
const NO_PASSWORD = 'A senha precisa ser preenchida';
const PASSWORD_MISMATCH = 'As senhas precisam ser iguais';
const USER_EXISTS = 'Esse email já esta sendo utilizado, tente fazer Login com ele';
const UNKNOWN_ERROR = 'Não foi possível cadastrar essas credenciais';

// FIREBASE_ERRORS

const fbErrors: Record<string, string> = {
	'auth/email-already-in-use': USER_EXISTS,
};

// SIGNIN WITH CREDENTIALS

type RefNames = 'fullNameRef' | 'emailRef' | 'passwordRef' | 'confirmPasswordRef';

type Refs = Record<RefNames, React.RefObject<HTMLInputElement>>;

export const signinWithCredentials = (refs: Refs) => async () => {
	const fullName = refs.fullNameRef.current?.value;
	const email = refs.emailRef.current?.value;
	const password = refs.passwordRef.current?.value;
	const confirmPassword = refs.confirmPasswordRef.current?.value;
	if (!fullName) throw new SnackbarError(NO_FULL_NAME);
	if (!email) throw new SnackbarError(NO_EMAIL);
	if (!password) throw new SnackbarError(NO_PASSWORD);
	if (!confirmPassword) throw new SnackbarError(NO_PASSWORD);
	if (password !== confirmPassword) throw new SnackbarError(PASSWORD_MISMATCH);
	try {
		const auth = getAuth();
		const request = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(request.user, { displayName: fullName });
		return new SnackbarReturn('usuário criado com sucesso');
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

const fullNamesErrors = [NO_FULL_NAME, UNKNOWN_ERROR];
const emailErrors = [NO_EMAIL, UNKNOWN_ERROR];
const passwordErrors = [NO_PASSWORD, PASSWORD_MISMATCH, UNKNOWN_ERROR];
const confirmPasswordErrors = [NO_PASSWORD, PASSWORD_MISMATCH, UNKNOWN_ERROR];

type ErrorsReturn = [boolean, boolean, boolean, boolean];

export const checkErrors = (error?: SnackbarError): ErrorsReturn => {
	if (!error) return [false, false, false, false];
	const fields = [fullNamesErrors, emailErrors, passwordErrors, confirmPasswordErrors];
	return fields.map((errors) => errors.includes(error.message)) as ErrorsReturn;
};
