import { ExtensionWebExports } from "@moonlight-mod/types";

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	settings: {
		dependencies: [
			{ id: "react" },
			{ ext: "spacepack", id: "spacepack" },
			{ ext: "moonbase", id: "moonbase" },
			{ id: "discord/components/common/index" },
			{ id: "discord/styles/shared/Margins.css" },
			{ id: "discord/components/common/PanelButton" },
			{ id: "discord/Constants" },
			"getGuildPermissionSpecMap:"
		],
		entrypoint: true // register the settings component
	}
};
