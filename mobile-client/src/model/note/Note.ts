export type Note = {
	id: number;
	title: string;
	content: string;
	modificationDate: number[];
};

export const buildDateFromModificationDate = (number: number[]) => {
	return `${number[2]}/${number[1]}/${number[0]}`;
};
