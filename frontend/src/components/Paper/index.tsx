import * as C from './styles';

export interface PaperProps {
	accentColor?: 'primary' | 'success';
	onClick?: () => void;
}

export const Paper: React.FC<PaperProps> = ({ children, accentColor = 'primary', onClick }) => (
	<C.Container cursor={onClick ? 'pointer' : 'unset'} onClick={onClick}>
		<C.BlueLine accentColor={accentColor} />
		{children}
	</C.Container>
);

Paper.displayName = 'Paper';
