import { GuildMemberCountStore } from "@moonlight-mod/wp/common_stores";
import { useStateFromStores } from "@moonlight-mod/wp/discord/packages/flux";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";

const { statusOnline, statusOffline, statusWrapper, count } = spacepack.findByCode(
	"inviteSplash:",
	"statusOnline:",
	"statusOffline:"
)[0].exports as Record<string, string>;
const locale: { getLocale(): string } = spacepack.findByCode("parse(document.cookie).locale")[0].exports.A;

export function wrapGuildNameComponent(guild, children: React.ReactNode) {
	return <GuildNameWrapper guild={guild}>{children}</GuildNameWrapper>;
}

function GuildNameWrapper({ guild, children }: { guild; children: React.ReactNode }) {
	return (
		<div className={"memberCount-guild-name-wrapper"}>
			{children}
			<MemberCount guild={guild} />
		</div>
	);
}

function MemberCount({ guild }: { guild }) {
	const [onlineCount, totalCount] = useStateFromStores([GuildMemberCountStore], () => [
		GuildMemberCountStore.getOnlineCount(guild.id) as number,
		GuildMemberCountStore.getMemberCount(guild.id) as number
	]);

	if (onlineCount === undefined || totalCount === undefined) return undefined;

	// TODO: I hope this works for all languages...
	const numberFormat = new Intl.NumberFormat(locale.getLocale());

	return (
		<div className="memberCount-container">
			<div className={statusWrapper}>
				<i className={statusOnline}></i>
				<span className={count}>{numberFormat.format(onlineCount)}</span>
			</div>
			<span className={statusWrapper}>
				<i className={statusOffline}></i>
				<span className={count}>{numberFormat.format(totalCount)}</span>
			</span>
		</div>
	);
}
