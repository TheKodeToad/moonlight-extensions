import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: '"guild_header"',
		replace: {
			match: /\(0,\i\.jsx\)\(\i\.\i,{variant:"text-md\/semibold",lineClamp:1,className:\i\.name,children:\i\.name\}\)/,
			replacement: "(require('memberCount_components').wrapGuildNameComponent(arguments[0].guild,$&))"
		}
	}
];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	components: {
		dependencies: [
			{ id: "react" },
			{ id: "discord/packages/flux" },
			{ ext: "common", id: "stores" },
			{ ext: "spacepack", id: "spacepack" }
		]
	}
};
