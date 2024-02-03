import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { formSchema } from './schema';

export const load: PageLoad = async () => {
	return {
		form: await superValidate(formSchema)
	};
};
