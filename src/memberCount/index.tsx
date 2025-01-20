import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: '"GuildHeader"',
		replace: {
			match: /(?<=variant:"text-md\/semibold",lineClamp:1,className:\i\.name,children:)\i.toString\(\)/,
			replacement: "require('memberCount_components').wrapGuildNameComponent(arguments[0].guild,$&)"
		}
	}
];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	components: {
		dependencies: []
	}
};
