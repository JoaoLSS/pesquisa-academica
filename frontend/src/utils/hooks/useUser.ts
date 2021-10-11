import { atom, useRecoilValue } from "recoil";
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, User } from 'firebase/auth'

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!))
const auth = getAuth(app)

if(process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099')
}

export const userAtom = atom({
    key: 'USER-ATOM',
    default: new Promise(() => {}) as Promise<User|null>,
    effects_UNSTABLE: [({ setSelf }) => auth.onAuthStateChanged(setSelf)],
    dangerouslyAllowMutability: true
})

export const useUser = () => {
    return useRecoilValue(userAtom)
}