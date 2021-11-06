/* eslint-disable camelcase */
import { IconButton, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { excludeAlternative } from 'pages/CreateSurvey/recoil/callbacks';
import { useRecoilState } from 'recoil';
import { useRecoilTransaction } from 'utils/hooks';
import * as atoms from '../../recoil/atoms';
import * as C from './styles';

interface AlternativeProps {
	questionID: string;
	ID: string;
	index: number;
}

const alphabet = 'abcdefghijklmnopqrstuvxz';

export const Alternative: React.FC<AlternativeProps> = ({ questionID, ID, index }) => {
	const [title, setTitle] = useRecoilState(atoms.alternativeTitle(ID));
	const removeAlternative = useRecoilTransaction(excludeAlternative, [questionID, ID]);
	return (
		<C.TitleContainer>
			{`${alphabet[index]}.`}
			<TextField label="Alternativa" value={title} onChange={(e) => setTitle(e.target.value)} />
			<IconButton onClick={removeAlternative}>
				<Close />
			</IconButton>
		</C.TitleContainer>
	);
};

Alternative.displayName = 'Question';
