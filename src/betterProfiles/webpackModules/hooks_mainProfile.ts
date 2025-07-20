import { UserStore } from "@moonlight-mod/wp/common_stores";

export function patchOpenUserProfileModalProps(props: {
	showGuildProfile: boolean;
	betterProfiles$respectGuildProfile: boolean;
	userId: string;
	guildId: string | null;
}) {
	const defaultToMainProfile = moonlight.getConfigOption<boolean>("betterProfiles", "defaultToMainProfile");

	if (defaultToMainProfile && !props.betterProfiles$respectGuildProfile) {
		props.showGuildProfile = false;

		if (UserStore.getUser(props.userId)?.bot) {
			props.guildId = null;
		}
	}
}
