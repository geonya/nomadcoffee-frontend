export const createCategoryObj = (name: string) => {
	return {
		name,
		slug: name.replace(' ', '-').toLowerCase(),
	};
};
