import { Patch } from "@moonlight-mod/types";
import { inlineRequire } from "profileTweaks/util";

const { patchOpenUserProfileModalProps } = inlineRequire("profileTweaks_hooks_mainProfile");

export default [
	{
		find: '.dispatch({type:"USER_PROFILE_MODAL_OPEN",',
		replace: {
			match: /let{userId:\i,guildId:\i,channelId:\i,messageId:\i,/,
			replacement: `${patchOpenUserProfileModalProps}(arguments[0]);$&`
		}
	},
	{
		find: 'action:"PRESS_VIEW_MAIN_PROFILE"',
		// allow the View Per-server profile button to function
		replace: {
			match: /showGuildProfile:!0/g,
			replacement: "$&,profileTweaks$respectGuildProfile:true"
		}
	},
	{
		find: "viewFullBioDisabled),onClick:",
		// allow View Full Bio to view the per server bio (if fullBioToggle is disabled)
		replace: {
			match: /openUserProfileModal\)\(\i\(\i\(\{\},\i\),\{/,
			replacement: "$&profileTweaks$respectGuildProfile:true,"
		}
	}
] satisfies Patch[];
