const months = [
	'janeiro',
	'fevereiro',
	'março',
	'abril',
	'maio',
	'junho',
	'julho',
	'agosto',
	'setembro',
	'outubro',
	'novembro',
	'dezembro',
];

export const formatDate = (str?: string | undefined | null) => {
	if (!str) return '-';
	const date = new Date(str);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	return `${day} de ${months[month]} de ${year}`;
};
