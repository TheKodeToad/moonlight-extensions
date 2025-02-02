import { Tag } from "staffTags/types";

export const BLURPLE = 0x5865f2;
// not technically a constant sorry
export function defaultConfig(): Tag[] {
	return [
		{
			label: "Owner",
			icon: "crown",
			color: BLURPLE,
			permissions: ["OWNER"]
		},
		{
			label: "Admin",
			color: BLURPLE,
			permissions: ["ADMINISTRATOR"],
			icon: "shield"
		},
		{
			label: "Manager",
			icon: "wrench",
			color: BLURPLE,
			permissions: ["MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES"]
		},
		{
			label: "Mod",
			icon: "hammer",
			color: BLURPLE,
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
