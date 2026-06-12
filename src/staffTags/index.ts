import "./mappings";

import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: ".onClickReply,onMouseEnter:",
		replace: {
			match: /\.onClickReply,onMouseEnter:\i,onMouseLeave:\i}\),\i/,
			replacement: '$&,require("staffTags_hooks").repliedMessageTag(arguments[0])'
		}
	},
	{
		find: ",nudgeAlignIntoViewport:!1,useRawTargetDimensions:!0,animation:",
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
	},
	{
		// borrowed from vencord: https://github.com/Vendicated/Vencord/blob/7dca07569d656ac1fd399e4d8dfecdc4ebaaa94d/src/plugins/_core/concatenatedComponentExtractor.tsx#L19-L25
		find: "Qp04hK),focusProps:",
		replace: [
			{
				match: /(?=function (\i)\(\i\)\{let\{.{0,100}suggestedColors:)/,
				replacement: 'require("staffTags_common").setColorSwatch($1);'
			}
		]
	}
];
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	settings: {
		dependencies: [
			{ id: "react" },
			{ id: "discord/uikit/legacy/Button" },
			{ id: "discord/uikit/Flex" },
			{ id: "discord/uikit/TextInput" },
			{ id: "discord/styles/shared/Margins.css" },
			{ id: "discord/modules/icons/web/TrashIcon" },
			{ id: "discord/components/common/PanelButton" },
			{ id: "discord/modules/icons/web/staffTags$ChevronLargeUpIcon" },
			{ id: "discord/modules/icons/web/staffTags$ChevronLargeDownIcon" },
			{ id: "discord/modules/guild_settings/web/AppCard.css" },
			{ id: "discord/Constants" },
			{ ext: "common", id: "stores" },
			{ ext: "moonbase", id: "moonbase" },
			{ ext: "spacepack", id: "spacepack" },
			{ ext: "staffTags", id: "common" },
			"getGuildPermissionSpecMap:",
			'??"single"==='
		],
		entrypoint: true // register the settings component
	},
	tags: {
		dependencies: [
			{ id: "react" },
			{ id: "discord/design/components/Tooltip/web/VoidTooltip" },
			{ id: "discord/design/components/Switch/web/ManaFormSwitch" },
			{ id: "discord/Constants" },
			{ id: "discord/utils/PermissionUtils" },
			{ ext: "common", id: "ErrorBoundary" },
			{ ext: "common", id: "stores" },
			{ ext: "componentEditor", id: "messages" },
			{ ext: "staffTags", id: "common" },
			"botTagVerified_",
			"memberInner_",
			"botTagCompact_"
		],
		entrypoint: true // register the decorators
	},
	common: {},
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
