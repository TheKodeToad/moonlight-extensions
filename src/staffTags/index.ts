import { ExtensionWebExports } from "@moonlight-mod/types";
import "./mappings";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: '"MemberListItem"',
		replace: {
			match: /\?\(0,\i\.jsx\)\(\i\.\i,{text:null!=\i\?\i:\i\.intl\.string\(\i\.\i\.pclUFB\)/,
			replacement: '&&require("staffTags_hooks").shouldShowCrown()$&'
		}
	}
];

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	settings: {
		dependencies: [
			{ id: "react" },
			{ id: "discord/components/common/index" },
			{ id: "discord/styles/shared/Margins.css" },
			{ id: "discord/components/common/PanelButton" },
			{ id: "discord/modules/guild_settings/web/AppCard.css" },
			{ id: "discord/Constants" },
			{ ext: "spacepack", id: "spacepack" },
			{ ext: "moonbase", id: "moonbase" },
			"getGuildPermissionSpecMap:",
			'.swatch,"aria-label"'
		],
		entrypoint: true // register the settings component
	},
	tags: {
		dependencies: [
			{ id: "react" },
			{ ext: "componentEditor", id: "memberList" },
			"computeLurkerPermissionsAllowList())&&void 0"
		],
		entrypoint: true // register the decorators
	},
	constants: {},
	hooks: {}
};
