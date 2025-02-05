import type { Permissions } from "@moonlight-mod/wp/discord/Constants";
import type { Icons } from "./webpackModules/common";

export interface Tag {
	label: string;
	icon: keyof typeof Icons;
	useRoleColor: boolean;
	color: number;
	permissions: (keyof typeof Permissions | "OWNER")[];
}
