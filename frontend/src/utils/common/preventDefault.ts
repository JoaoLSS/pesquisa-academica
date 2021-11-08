import React from 'react';

type Handler = (e: React.MouseEvent) => any;

export const preventDefault = (handler: Handler) => (e: React.MouseEvent) => {
	e.preventDefault();
	e.stopPropagation();
	handler(e);
};
