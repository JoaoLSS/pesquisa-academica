export const onChange =
	(setter: (value: string) => any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setter(e.target.value);
