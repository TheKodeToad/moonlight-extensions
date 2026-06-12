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
		discordName: "staffTags$HammerIcon",
		displayName: "Hammer"
	},
	wrench: {
		discordName: "staffTags$WrenchIcon",
		displayName: "Wrench"
	},
	gear: {
		discordName: "staffTags$GearIcon",
		displayName: "Gear"
	},
	shield: {
		discordName: "staffTags$ShieldIcon",
		displayName: "Shield"
	},
	crown: {
		discordName: "staffTags$CrownIcon",
		displayName: "Crown"
	},
	key: {
		discordName: "staffTags$KeyIcon",
		displayName: "Key"
	},
	swords: {
		discordName: "staffTags$ModerationIcon",
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

	const prefix = "discord/modules/icons/web/";

	return require(prefix + icon.discordName)?.default;
}

export let ColorSwatch: React.FunctionComponent<any> | null = null;

export function setColorSwatch(value) {
	ColorSwatch = value;
}
