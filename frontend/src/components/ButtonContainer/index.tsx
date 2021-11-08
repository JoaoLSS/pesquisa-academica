import React from 'react';
import * as C from './styles';

interface ButtonContainerProps {
	justify?: 'center' | 'flex-start' | 'flex-end';
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({ children, justify = 'center' }) => (
	<C.Container justify={justify} nc={React.Children.count(children)}>
		{children}
	</C.Container>
);

ButtonContainer.displayName = 'ButtonContainer';
