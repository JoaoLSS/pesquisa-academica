import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography,
	MenuItem,
	Menu,
	Box,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { useThemeMode } from 'themes';
import { useUserLoadable } from 'utils/hooks';
import * as C from './styles';

interface NavbarProps {
	title?: string;
	hide?: boolean;
}

const NavbarInternal: React.FC<NavbarProps> = ({ title, hide }) => {
	const [theme, toggleTheme] = useThemeMode();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [userLoadable, logout] = useUserLoadable();
	const [drawer, setDrawer] = React.useState(false);

	const handleMenu: React.MouseEventHandler<HTMLElement> = ({ currentTarget }) => setAnchorEl(currentTarget);

	const handleClose = () => setAnchorEl(null);

	const handleLogout = () => {
		handleClose();
		logout().then(() => toggleTheme('light'));
	};

	if (hide) {
		return null;
	}

	const profilePic = userLoadable.getValue()?.photoURL;

	return (
		<>
			<Paper>
				<C.NavbarSkeleton>
					<IconButton edge="start" onClick={() => setDrawer(true)}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<IconButton onClick={() => toggleTheme()}>
						{theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
					<div>
						<IconButton onClick={handleMenu}>
							{profilePic ? (
								<img style={{ width: 20, height: 20 }} src={profilePic} alt="profile" />
							) : (
								<AccountCircle />
							)}
						</IconButton>
						<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
							<MenuItem>Minha conta</MenuItem>
							<MenuItem onClick={handleLogout}>Sair</MenuItem>
						</Menu>
					</div>
				</C.NavbarSkeleton>
			</Paper>
			<Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
				<Box sx={{ width: 200 }} onClick={() => setDrawer(false)}>
					<List>
						<ListItem button onClick={() => history.push('/surveys')}>
							<ListItemText primary="Minhas pesquisas" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Minha conta" />
						</ListItem>
						<ListItem button onClick={handleLogout}>
							<ListItemText primary="Sair" />
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</>
	);
};

type NavbarContext = (props: NavbarProps) => void;

const contextSetterError = () => {
	throw new Error('You tried to set the navbar outside of the NavbarContainer');
};

const navbarContext = React.createContext<NavbarContext>(contextSetterError);

export const NavbarContainer: React.FC = ({ children }) => {
	const [props, setProps] = React.useState<NavbarProps>({ hide: true });
	return (
		<navbarContext.Provider value={setProps}>
			<C.Container>
				<NavbarInternal title={props.title} hide={props.hide} />
				{children}
			</C.Container>
		</navbarContext.Provider>
	);
};

NavbarContainer.displayName = 'NavbarContainer';

export const Navbar: React.FC<NavbarProps> = ({ title, hide }) => {
	const setProps = React.useContext(navbarContext);
	React.useLayoutEffect(() => setProps({ title, hide }), [title, hide]);
	return null;
};

Navbar.displayName = 'Navbar';
