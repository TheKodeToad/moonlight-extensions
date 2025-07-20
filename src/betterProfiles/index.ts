import { ExtensionWebExports } from "@moonlight-mod/types";

function inlineRequire(module: string): Record<string, string> {
	const base = `require(${JSON.stringify(module)})`;

	return new Proxy(
		{},
		{
			get(_, prop) {
				if (typeof prop === "symbol") {
					throw new Error("Symbol access is not supported");
				}

				return `${base}[${JSON.stringify(prop)}]`;
			}
		}
	);
}

const { useState } = inlineRequire("react");
const { shouldUseFullBioToggle, shouldExpandBioByDefault, getViewFullBioText } = inlineRequire("betterProfiles_hooks");

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "viewFullBioDisabled),onClick:",
		replace: [
			{
				match: /(,\i=\(\)=>\{)(null==\i||\i\(\),\(0,\i\.openUserProfileModal)/,
				replacement: `
				, [expandedBio, setExpandedBio] = ${useState}(${shouldExpandBioByDefault}())
				$1
				if (${shouldUseFullBioToggle}()) {
					return setExpandedBio(x => !x);
				}
				$2`
			},
			{
				match: /\i\(\)\(\i\.descriptionClamp,\i&&\i\.maxBioHeight\)/,
				replacement: "!expandedBio&&$&"
			},
			{
				match: /\(0,\i\.jsx\)\(\i\.\i,\{look:\i\.\i\.Looks\.BLANK,size:\i\.\i\.Sizes\.NONE,className:\i\.viewFullBio/,
				replacement: `(${shouldUseFullBioToggle}()||!${shouldExpandBioByDefault}())&&$&`
			},
			{
				match: /\i\.\i\.\i\(\i\.\i\.YDiPq6\)/,
				replacement: `${getViewFullBioText}(expandedBio)||$&`
			}
		]
	}
];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = { hooks: {} };
