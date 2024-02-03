import { createStorage } from 'unstorage';
import indexedDbDriver from 'unstorage/drivers/indexedb';
import type { Book } from './types';

export const createLocalBookDB = () => {
	return createStorage<Book>({
		driver: indexedDbDriver({ base: 'book', dbName: 'paysha-books', storeName: 'books' })
	});
};
