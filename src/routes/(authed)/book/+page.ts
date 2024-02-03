import type { PageLoad } from './$types';
import { createIndexDB } from '$lib/storage';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ url: { searchParams } }) => {
	if (!browser) return {};

	const bookId = searchParams.get('id');

	return { book_data: await createIndexDB().getItem(bookId || '') };
};
