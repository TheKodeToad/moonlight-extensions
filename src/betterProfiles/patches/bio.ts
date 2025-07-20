import { Patch } from "@moonlight-mod/types";
import { inlineRequire } from "betterProfiles/util";

const { useState } = inlineRequire("react");
const { shouldUseFullBioToggle, shouldExpandBioByDefault, getViewFullBioText } =
	inlineRequire("betterProfiles_hooks_bio");

export default [
	{
		find: "viewFullBioDisabled),onClick:",
		replace: [
			{
				match: /,(\i)=\(\)=>\{(null==\i||\i\(\),\(0,\i\.openUserProfileModal)/,
				replacement: `
					, [expandedBio, setExpandedBio] = ${useState}(${shouldExpandBioByDefault}())
					, $1 = () => {
						if (${shouldUseFullBioToggle}()) {
							return setExpandedBio(x => !x);
						}
						$2
				`
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
] satisfies Patch[];
