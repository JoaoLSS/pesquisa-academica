import { atom, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, User } from 'firebase/auth';
import { useCallback } from 'react';

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!));
const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://localhost:9099');
}

export const userAtom = atom({
	key: 'USER-ATOM',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	default: new Promise(() => {}) as Promise<User | null>,
	effects_UNSTABLE: [({ setSelf }) => auth.onAuthStateChanged(setSelf)],
	dangerouslyAllowMutability: true,
});

export const useUser = () => {
	const user = useRecoilValue(userAtom);
	const logout = useCallback(() => auth.signOut(), []);
	return [user, logout] as const;
};

export const useUserLoadable = () => {
	const userLoadable = useRecoilValueLoadable(userAtom);
	const logout = useCallback(() => auth.signOut(), []);
	return [userLoadable, logout] as const;
};
