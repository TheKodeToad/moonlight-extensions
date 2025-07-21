import { UserStore } from "@moonlight-mod/wp/common_stores";

export function patchOpenUserProfileModalProps(props: {
	showGuildProfile: boolean;
	profileTweaks$respectGuildProfile: boolean;
	userId: string;
	guildId: string | null;
}) {
	const defaultToMainProfile = moonlight.getConfigOption<boolean>("profileTweaks", "defaultToMainProfile");

	if (defaultToMainProfile && !props.profileTweaks$respectGuildProfile) {
		props.showGuildProfile = false;

		if (UserStore.getUser(props.userId)?.bot) {
			props.guildId = null;
		}
	}
}
