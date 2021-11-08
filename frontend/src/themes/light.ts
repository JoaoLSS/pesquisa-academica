import { createTheme } from '@material-ui/core';
import { base } from './base';

export const light = createTheme({
	...base,
	palette: {
		mode: 'light',
		background: {
			default: '#eee',
		},
	},
});
