import { getAuth, signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { Button, Container, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../../components';
import analytics from '../../illustrations/analytics.svg';

const googleProvider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const loginWithGoogle = React.useCallback(() => {
    if (loading) return;
    setLoading(true);
    const auth = getAuth();
    signInWithPopup(auth, googleProvider).catch((error) => {
      setLoading(false);
    });
  }, [loading]);
  return (
    <Container
      style={{ height: '100vh', placeItems: 'center', display: 'grid' }}
    >
      <Navbar hide />
      <Paper elevation={3}>
        <img src={analytics} alt="analytics_hero" />
        <TextField label="Email" />
        <TextField label="Senha" />
        <Button onClick={loginWithGoogle}>Google</Button>
      </Paper>
    </Container>
  );
};

Login.displayName = 'Login';

export default Login;
