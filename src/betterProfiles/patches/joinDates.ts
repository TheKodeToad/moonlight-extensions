import { Patch } from "@moonlight-mod/types";
import { inlineRequire } from "betterProfiles/util";

const { popoutJoinDates } = inlineRequire("betterProfiles_hooks_joinDates");

export default [
	{
		find: 'location:"UserProfilePopoutBody"',
		replace: {
			match: /null!=\i&&\(0,\i\.jsx\)\(\i\.\i,{user:\i,currentUser:\i,guild:\i}\)(?=])/,
			replacement: `$&,${popoutJoinDates}(arguments[0])`
		}
	},
	{
		find: "uvGmCw),",
		replace: [
			{
				match: /(?<=text:)\i\.\i\.\i\(\i\.\i\.uvGmCw\)/,
				replacement: 'arguments[0].betterProfiles$popout?"Discord Member Since":$&'
			},
			{
				match: /(?<=text:)\i\.name/,
				replacement: '$&.replace(/^/,arguments[0].betterProfiles$popout?"Joined ":"")'
			},
			{
				match: /(?<=\.joinedAt,v\);)return (null==\i\|\|null==\i)\?/,
				replacement: `
					let betterProfiles$hideGuild = $1;
					return betterProfiles$hideGuild && !arguments[0].betterProfiles$popout ?
				`
			},
			{
				match: /(\(0,\i\.jsx\)\("div",{className:\i\.divider}\)),(\(0,\i\.jsxs\)\("div",{className:\i\.memberSince,.{10,50}?text:\i\.name)/,
				replacement: "!betterProfiles$hideGuild&&$1,!betterProfiles$hideGuild&&$2"
			}
		]
	}
] satisfies Patch[];
