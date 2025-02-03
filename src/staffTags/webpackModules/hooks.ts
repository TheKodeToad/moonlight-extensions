import { defaultConfig } from "@moonlight-mod/wp/staffTags_constants";
import { Tag } from "staffTags/types";

export function shouldShowCrown() {
	const tags = (moonlight.getConfigOption("staffTags", "tags") ?? defaultConfig()) as Tag[];
	return !tags.some((tag) => tag.permissions.includes("OWNER"));
}
