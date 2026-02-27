import Components from "@moonlight-mod/wp/discord/components/common/index";
import { Tag } from "staffTags/types";

export const BLURPLE = 0x5865f2;

export function defaultConfig(): Tag[] {
	return [
		{
			label: "Owner",
			icon: "crown",
			color: BLURPLE,
			useRoleColor: false,
			permissions: ["OWNER"]
		},
		{
			label: "Admin",
			color: BLURPLE,
			useRoleColor: false,
			permissions: ["ADMINISTRATOR"],
			icon: "shield"
		},
		{
			label: "Manager",
			icon: "wrench",
			color: BLURPLE,
			useRoleColor: false,
			permissions: ["MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES"]
		},
		{
			label: "Mod",
			icon: "hammer",
			color: BLURPLE,
			useRoleColor: false,
			permissions: [
				"KICK_MEMBERS",
				"BAN_MEMBERS",
				"MUTE_MEMBERS",
				"DEAFEN_MEMBERS",
				"MOVE_MEMBERS",
				"MANAGE_NICKNAMES",
				"MODERATE_MEMBERS"
			]
		}
	];
}

const _icons = {
	hammer: {
		discordName: "Hammer",
		displayName: "Hammer"
	},
	wrench: {
		discordName: "Wrench",
		displayName: "Wrench"
	},
	gear: {
		discordName: "Gear",
		displayName: "Gear"
	},
	shield: {
		discordName: "Shield",
		displayName: "Shield"
	},
	crown: {
		discordName: "Crown",
		displayName: "Crown"
	},
	key: {
		discordName: "Key",
		displayName: "Key"
	},
	swords: {
		discordName: "Moderation",
		displayName: "Swords"
	}
};

export interface Icon {
	discordName: string;
	displayName: string;
}

export const Icons: Record<keyof typeof _icons, Icon> = _icons;

export function iconComponent(id: string): React.FunctionComponent<any> | undefined {
	const icon = Icons[id];

	if (icon === undefined) return;

	return Components[`${icon.discordName}Icon`] ?? Components[`staffTags$${icon.discordName}Icon`];
}
