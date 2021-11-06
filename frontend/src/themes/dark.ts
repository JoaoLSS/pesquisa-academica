import { createTheme } from '@material-ui/core';
import { base } from './base';

export const dark = createTheme({
	...base,
	palette: {
		mode: 'dark',
	},
});
