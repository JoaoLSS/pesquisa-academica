import { IconButton, TextField, TextFieldProps } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';

export const PasswordField: React.FC<TextFieldProps> = (props) => {
	const [hide, setHide] = useState(true);
	return (
		<TextField
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
			inputProps={{ type: hide ? 'password' : 'text' }}
			InputProps={{
				endAdornment: (
					<IconButton onClick={() => setHide(!hide)}>{hide ? <Visibility /> : <VisibilityOff />}</IconButton>
				),
			}}
		/>
	);
};

PasswordField.displayName = 'PasswordField';
