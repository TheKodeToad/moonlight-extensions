import { Patch } from "@moonlight-mod/types";
import { inlineRequire } from "profileTweaks/util";

const { popoutJoinDates, getDiscordUserSinceText, getGuildMemberSinceText, dateTooltipWrapper } =
	inlineRequire("profileTweaks_joinDates");

export default [
	{
		find: 'location:"UserProfilePopoutBody"',
		replace: {
			match: /null!=\i&&\(0,\i\.jsx\)\(\i\.\i,{user:\i,currentUser:\i,guild:\i}\)(?=])/,
			replacement: `$&,${popoutJoinDates}(arguments[0])`
		}
	},
	{
		find: 'location:"BotUserProfilePopoutBody"',
		replace: {
			match: /\.LPJmLy\),children:\(0,\i\.jsx\)\(\i\.\i,\{user:\i,currentUser:\i,guild:\i}\)}\)/,
			replacement: `$&,${popoutJoinDates}({...arguments[0],withLabel:true})`
		}
	},
	{
		find: "uvGmCw),",
		replace: [
			{
				match: /(?<=\.joinedAt,\i\);)return (null==\i\|\|null==\i)\?/,
				replacement: `
					let profileTweaks$hideGuild = $1;
					return profileTweaks$hideGuild && !arguments[0].profileTweaks$bare ?
				`
			},
			{
				match: /(?<=text:)\i\.\i\.\i\(\i\.\i\.uvGmCw\)/,
				replacement: `${getDiscordUserSinceText}(arguments[0])||$&`
			},
			{
				match: /(\(0,\i\.jsxs\)\("div",{className:\i\.memberSince,.{10,50}?{text:)(\i\.name)/,
				replacement: `!profileTweaks$hideGuild&&$1${getGuildMemberSinceText}(arguments[0],$2)`
			},
			{
				match: /\(0,\i\.jsx\)\("div",{className:\i\.divider}\)/,
				replacement: "!profileTweaks$hideGuild&&$&"
			},

			{
				match: /\(0,\i\.\i\)\((\i\.\i\.extractTimestamp\(\i\)),\i\)/,
				replacement: `${dateTooltipWrapper}({time:$1,text:$&})`
			},
			{
				match: /\(0,\i\.\i\)\((null==\i\?void 0:\i\.joinedAt),\i\)/,
				replacement: `${dateTooltipWrapper}({time:$1,text:$&})`
			}
		]
	}
] satisfies Patch[];
