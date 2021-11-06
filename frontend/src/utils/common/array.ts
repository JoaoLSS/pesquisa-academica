// UTILS

const compare =
	<T>(a: T) =>
	(b: T) =>
		a !== b;

// EXPORTS

export const createArray = (size: number) => Array.from(Array(size).keys());
export const filter =
	<T>(value: T) =>
	(arr: T[]) =>
		arr.filter(compare(value));
