import { Patch } from "@moonlight-mod/types";
import { inlineRequire } from "profileTweaks/util";

const { useState } = inlineRequire("react");
const { shouldUseFullBioToggle, shouldExpandBioByDefault, getViewFullBioText } = inlineRequire("profileTweaks_bio");

export default [
	{
		find: "viewFullBioDisabled),onClick:",
		replace: [
			{
				match: /,(\i)=\(\)=>{(null==\i||\i\(\),\(0,\i\.openUserProfileModal)/,
				replacement: `
					, [profileTweaks$expandedBio, profileTweaks$setExpandedBio] = ${useState}(${shouldExpandBioByDefault}())
					, $1 = () => {
						if (${shouldUseFullBioToggle}()) {
							return profileTweaks$setExpandedBio(x => !x);
						}
						$2
				`
			},
			{
				match: /\i\(\)\(\i\.descriptionClamp,\i&&\i\.maxBioHeight\)/,
				replacement: "!profileTweaks$expandedBio&&$&"
			},
			{
				match: /\(0,\i\.jsx\)\(\i\.\i,{look:\i\.\i\.Looks\.BLANK,size:\i\.\i\.Sizes\.NONE,className:\i\.viewFullBio/,
				replacement: `(${shouldUseFullBioToggle}()||!${shouldExpandBioByDefault}())&&$&`
			},
			{
				match: /\i\.\i\.\i\(\i\.\i\.YDiPq6\)/,
				replacement: `${getViewFullBioText}(profileTweaks$expandedBio)||$&`
			}
		]
	}
] satisfies Patch[];
