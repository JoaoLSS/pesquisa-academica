import { ThemeOptions } from '@material-ui/core';

export const base: ThemeOptions = {
	components: {
		MuiPaper: {
			defaultProps: {
				elevation: 3,
			},
		},
		MuiTextField: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
		},
		MuiIconButton: {
			defaultProps: {
				color: 'inherit',
			},
		},
		MuiMenu: {
			defaultProps: {
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right',
				},
				keepMounted: true,
				transformOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		},
		MuiSnackbar: {
			defaultProps: {
				anchorOrigin: { vertical: 'top', horizontal: 'center' },
				autoHideDuration: 6000,
			},
		},
		MuiAlert: {
			defaultProps: {
				elevation: 6,
				variant: 'filled',
			},
		},
	},
};
