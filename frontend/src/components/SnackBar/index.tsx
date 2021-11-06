import { Alert, AlertProps, Snackbar } from '@material-ui/core';
import React from 'react';
import { usePrevious } from 'react-use';

interface SnackbarAttrs {
	severity: AlertProps['severity'];
	message: string;
}

type SnackbarSetter = (attrs: SnackbarAttrs | null) => void;

const snackbarSetterError = () => {
	throw new Error('You attempted to set a snackbar outside of their context provider');
};

const SnackbarContext = React.createContext<SnackbarSetter>(snackbarSetterError);

export const SnackbarProvider: React.FC = ({ children }) => {
	const [snackbar1, setSnackbar] = React.useState<SnackbarAttrs | null>(null);
	const snackbar2 = usePrevious(snackbar1);
	const snackbar = snackbar1 || snackbar2;
	return (
		<SnackbarContext.Provider value={setSnackbar}>
			{children}
			<Snackbar open={!!snackbar1} onClose={() => setSnackbar(null)}>
				<Alert severity={snackbar?.severity}>{snackbar?.message}</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

SnackbarProvider.displayName = 'SnackbarProvider';

export const useSnackbar = () => React.useContext(SnackbarContext);

export class SnackbarReturn {
	message: string;

	constructor(message: string) {
		this.message = message;
	}
}

export class SnackbarError extends Error {}
