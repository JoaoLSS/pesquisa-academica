import { styled } from '@material-ui/core/styles';

export const Container = styled('div')(() => ({
  position: 'sticky',
  top: 0,
  right: 0,
  left: 0,
}));

export const NavbarSkeleton = styled('div')(({ theme }) => ({
  height: 60,
  backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto auto',
  alignItems: 'center',
  padding: '0px 20px',
}));
