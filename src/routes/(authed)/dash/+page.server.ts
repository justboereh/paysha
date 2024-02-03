import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (!session) return { useLocalData: true as const };

	return { name: session.user?.name };
};
