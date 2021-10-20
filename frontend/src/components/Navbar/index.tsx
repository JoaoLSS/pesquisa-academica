import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as C from './styles';
import { useThemeMode } from '../../themes';
import { useUser } from '../../utils/hooks';

type NavbarContext = (node: React.ReactNode) => void;

const contextSetterError = () => {
  throw new Error('You tried to set the navbar outside of the NavbarContainer');
};

const navbarContext = React.createContext<NavbarContext>(contextSetterError);

export const NavbarContainer: React.FC = ({ children }) => {
  const [component, setComponent] = React.useState<React.ReactNode>(null);
  return (
    <navbarContext.Provider value={setComponent}>
      <C.Container>
        {component}
        {children}
      </C.Container>
    </navbarContext.Provider>
  );
};

NavbarContainer.displayName = 'NavbarContainer';

interface NavbarProps {
  title?: string;
  hide?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ title, hide }) => {
  const setComponent = React.useContext(navbarContext);
  const [theme, toggleTheme] = useThemeMode();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [, logout] = useUser();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout().then(() => toggleTheme('light'));
  };

  React.useLayoutEffect(() => {
    if (hide) {
      setComponent(null);
      return;
    }
    setComponent(
      <Paper elevation={3}>
        <C.NavbarSkeleton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.push('/survey/1')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => toggleTheme()}
            color="inherit"
          >
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </C.NavbarSkeleton>
      </Paper>
    );
  });

  return null;
};

Navbar.displayName = 'Navbar';
