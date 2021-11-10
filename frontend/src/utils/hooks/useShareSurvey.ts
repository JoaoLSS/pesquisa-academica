import { useSnackbar } from 'components';
import { useCallback } from 'react';

export const useShareSurvey = () => {
	const snackbar = useSnackbar();
	return useCallback((id: string) => {
		navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/respond/${id}`);
		snackbar({
			severity: 'success',
			message: 'A URL da pesquisa foi copiada para sua area de transferencia!',
		});
	}, []);
};
