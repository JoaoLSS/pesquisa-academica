import { makeStyles, DefaultTheme } from '@material-ui/styles';

interface SeparatorProps {
	verticalSpace?: React.CSSProperties['paddingTop'];
	color?: React.CSSProperties['backgroundColor'];
}

const useStyle = makeStyles<DefaultTheme, SeparatorProps>(() => ({
	container: {
		width: '100%',
		height: '1px',
		backgroundColor: (props) => props.color || 'gray',
		marginTop: (props) => props.verticalSpace,
		marginBottom: (props) => props.verticalSpace,
	},
}));

export const Separator: React.FC<SeparatorProps> = (props) => {
	const classes = useStyle(props);
	return <div className={classes.container} />;
};

Separator.displayName = 'Separator';
