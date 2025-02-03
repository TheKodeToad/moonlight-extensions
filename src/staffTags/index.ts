import { ExtensionWebExports } from "@moonlight-mod/types";
import "./mappings";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: '"MemberListItem"',
		replace: {
			match: /\?\(0,\i\.jsx\)\(\i\.\i,{text:null!=\i\?\i:\i\.intl\.string\(\i\.\i\.pclUFB\)/,
			replacement: '&&require("staffTags_hooks").shouldShowCrown()$&'
		}
	},
	{
		find: 'location:"RepliedMessage"',
		replace: {
			match: /\.onClickReply,onMouseEnter:\i,onMouseLeave:\i}\),\i/,
			replacement: '$&,require("staffTags_hooks").repliedMessageTag(arguments[0])'
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
			{ ext: "common", id: "stores" },
			{ ext: "moonbase", id: "moonbase" },
			{ ext: "spacepack", id: "spacepack" },
			{ ext: "staffTags", id: "constants" },
			"getGuildPermissionSpecMap:",
			'.swatch,"aria-label"'
		],
		entrypoint: true // register the settings component
	},
	tags: {
		dependencies: [
			{ id: "react" },
			{ ext: "componentEditor", id: "memberList" },
			{ ext: "staffTags", id: "constants" },
			"computeLurkerPermissionsAllowList())&&void 0"
		],
		entrypoint: true // register the decorators
	},
	constants: {},
	hooks: {
		dependencies: [
			{ id: "react" },
			{ ext: "staffTags", id: "constants" },
			{ ext: "common", id: "stores" },
			{ ext: "staffTags", id: "tags" }
		]
	}
};
