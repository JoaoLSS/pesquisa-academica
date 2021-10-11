import { getAuth, signInWithPopup, GoogleAuthProvider } from '@firebase/auth'
import React from 'react'

const googleProvider = new GoogleAuthProvider()

const Login: React.FC = () => {
    const [loading,setLoading] = React.useState(false)
    const loginWithGoogle = React.useCallback(() => {
        if(loading) return;
        setLoading(true)
        const auth = getAuth()
        signInWithPopup(auth, googleProvider)
            .catch((error) => {
                setLoading(false)
            })
    },[loading])
    return <button onClick={loginWithGoogle}>Login Com o Google</button>
}

Login.displayName = 'Login'

export default Login