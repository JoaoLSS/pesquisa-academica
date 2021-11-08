import { styled, Container as MUIContainer } from '@material-ui/core';
import { showAnimation } from 'utils/common';

export const Container = styled(MUIContainer)({
	display: 'grid',
	gap: 20,
	paddingTop: 50,
});

Container.displayName = 'Container';

const InnerImageContainer = styled('div')({
	display: 'grid',
	placeItems: 'center',
	gap: 20,
	animation: showAnimation,
});

export const SVG = styled('img')({
	width: '300px',
	height: '300px',
});

export const Text = styled('label')({
	width: '300px',
	textAlign: 'center',
});

interface ImageContainerProps {
	src: string;
	text: string;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ src, text }) => (
	<InnerImageContainer>
		<SVG src={src} alt={src} />
		<Text>{text}</Text>
	</InnerImageContainer>
);

ImageContainer.displayName = 'ImageContainer';
