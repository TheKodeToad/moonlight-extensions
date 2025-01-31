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
	moderation: {
		discordName: "Moderation",
		displayName: "Swords"
	}
};

export interface Icon {
	discordName: string;
	displayName: string;
}

export const Icons: Record<keyof typeof _icons, Icon> = _icons;
