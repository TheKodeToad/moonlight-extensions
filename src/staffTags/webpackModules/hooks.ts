import { Tag } from "staffTags/types";

export function shouldShowCrown() {
	const tags = moonlight.getConfigOption("staffTags", "tags") as Tag[];
	return !tags.some((tag) => tag.permissions.includes("OWNER"));
}
