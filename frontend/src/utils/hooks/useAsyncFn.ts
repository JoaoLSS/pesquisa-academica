import { useRef } from 'react';
import { useAsyncFn as _useAsyncFn } from 'react-use';
import { FunctionReturningPromise } from 'react-use/lib/misc/types';
import { useSnackbar, SnackbarError, SnackbarReturn } from 'components';

export const useAsyncFn = <T extends FunctionReturningPromise>(fn: T) => {
	const fnRef = useRef(fn);
	fnRef.current = fn;
	const snackbar = useSnackbar();
	return _useAsyncFn(
		(async (...args) => {
			try {
				const result = await fnRef.current(...args);
				if (result instanceof SnackbarReturn) {
					snackbar({ severity: 'success', message: result.message });
				}
				return result;
			} catch (error) {
				if (error instanceof SnackbarError) {
					snackbar({ severity: 'error', message: error.message });
				}
				throw error;
			}
		}) as T,
		[],
	);
};
