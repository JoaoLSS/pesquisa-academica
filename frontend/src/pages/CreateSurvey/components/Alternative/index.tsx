import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Close } from '@material-ui/icons';
import { excludeAlternative } from 'pages/CreateSurvey/recoil/callbacks';
import { useRecoilState } from 'recoil';
import { onChange } from 'utils/common';
import { useRecoilTransaction } from 'utils/hooks';
import * as atoms from '../../recoil/atoms';

interface AlternativeProps {
	questionID: string;
	ID: string;
	index: number;
}

const alphabet = 'abcdefghijklmnopqrstuvxz';

const startAdornment = (index: number) => ({
	startAdornment: <InputAdornment position="start">{alphabet[index]}.</InputAdornment>,
});

const endAdornment = (onClick: () => void) => ({
	endAdornment: (
		<IconButton onClick={onClick}>
			<Close sx={{ color: grey[500] }} />
		</IconButton>
	),
});

export const Alternative: React.FC<AlternativeProps> = ({ questionID, ID, index }) => {
	const [title, setTitle] = useRecoilState(atoms.alternativeTitle(ID));
	const removeAlternative = useRecoilTransaction(excludeAlternative, [questionID, ID]);
	return (
		<TextField
			value={title}
			onChange={onChange(setTitle)}
			error={!title.length}
			sx={{ width: '60%' }}
			InputProps={{ ...startAdornment(index), ...endAdornment(removeAlternative) }}
		/>
	);
};

Alternative.displayName = 'Alternative';
