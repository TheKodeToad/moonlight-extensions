import "./mappings";

import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: 'location:"RepliedMessage"',
		replace: {
			match: /\.onClickReply,onMouseEnter:\i,onMouseLeave:\i}\),\i/,
			replacement: '$&,require("staffTags_hooks").repliedMessageTag(arguments[0])'
		}
	},
	{
		find: ".lostPermission",
		replace: [
			{
				match: /(?<=decorators:)\(0,\i\.jsx\)\(\i,\{.{10,200}?\}\)/,
				replacement: '[($&),require("staffTags_hooks").memberListTag(arguments[0])]'
			},
			{
				match: /(?<=ownerTooltipText:\i\}=\i;return )null!=\i/,
				replacement: 'require("staffTags_hooks").shouldShowCrown()&&$&'
			}
		]
	}
];
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	settings: {
		dependencies: [
			{ id: "react" },
			{ id: "discord/components/common/index" },
			{ id: "discord/uikit/legacy/Button" },
			{ id: "discord/uikit/Flex" },
			{ id: "discord/uikit/TextInput" },
			{ id: "discord/styles/shared/Margins.css" },
			{ id: "discord/components/common/PanelButton" },
			{ id: "discord/modules/guild_settings/web/AppCard.css" },
			{ id: "discord/Constants" },
			{ ext: "common", id: "stores" },
			{ ext: "moonbase", id: "moonbase" },
			{ ext: "spacepack", id: "spacepack" },
			{ ext: "staffTags", id: "common" },
			"getGuildPermissionSpecMap:",
			'.swatch,"aria-label"'
		],
		entrypoint: true // register the settings component
	},
	tags: {
		dependencies: [
			{ id: "react" },
			{ id: "discord/components/common/index" },
			{ id: "discord/Constants" },
			{ ext: "common", id: "ErrorBoundary" },
			{ ext: "common", id: "stores" },
			{ ext: "componentEditor", id: "messages" },
			{ ext: "staffTags", id: "common" },
			"computeLurkerPermissionsAllowList())",
			"-botTagVerified",
			"-memberInner",
			"-botTagCompact"
		],
		entrypoint: true // register the decorators
	},
	common: {
		dependencies: [{ id: "discord/components/common/index" }]
	},
	hooks: {
		dependencies: [
			{ id: "react" },
			{ ext: "common", id: "ErrorBoundary" },
			{ ext: "common", id: "stores" },
			{ ext: "staffTags", id: "common" },
			{ ext: "staffTags", id: "tags" }
		]
	}
};
