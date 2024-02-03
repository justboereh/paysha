export type BookPageData = {
	id: string;
	description?: string;
	date: Date;
	amount: number;
};

export type BookPage = {
	type: 'income' | 'expense';
	data: BookPageData[];
};

export type Book = {
	id: string;
	title: string;
	pages: BookPage[];
};
