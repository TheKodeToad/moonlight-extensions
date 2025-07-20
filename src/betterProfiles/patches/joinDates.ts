import { Patch } from "@moonlight-mod/types";
import { inlineRequire } from "betterProfiles/util";

const { popoutJoinDates, getDiscordUserSinceText, getGuildMemberSinceText } = inlineRequire(
	"betterProfiles_hooks_joinDates"
);

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
				match: /(?<=\.joinedAt,v\);)return (null==\i\|\|null==\i)\?/,
				replacement: `
					let betterProfiles$hideGuild = $1;
					return betterProfiles$hideGuild && !arguments[0].betterProfiles$bare ?
				`
			},
			{
				match: /(?<=text:)\i\.\i\.\i\(\i\.\i\.uvGmCw\)/,
				replacement: `${getDiscordUserSinceText}(arguments[0])||$&`
			},
			{
				match: /(\(0,\i\.jsxs\)\("div",{className:\i\.memberSince,.{10,50}?{text:)(\i\.name)/,
				replacement: `!betterProfiles$hideGuild&&$1${getGuildMemberSinceText}(arguments[0],$2)`
			},
			{
				match: /\(0,\i\.jsx\)\("div",{className:\i\.divider}\)/,
				replacement: "!betterProfiles$hideGuild&&$&"
			}
		]
	}
] satisfies Patch[];
