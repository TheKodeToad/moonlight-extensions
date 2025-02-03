import { GuildStore } from "@moonlight-mod/wp/common_stores";
import memberList from "@moonlight-mod/wp/componentEditor_memberList";
import message from "@moonlight-mod/wp/componentEditor_messages";
import Components, { Tooltip } from "@moonlight-mod/wp/discord/components/common/index";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { Icons } from "@moonlight-mod/wp/staffTags_constants";
import { Tag } from "staffTags/types";
import { defaultConfig } from "./constants";

const PermissionUtils = spacepack.findByCode("computeLurkerPermissionsAllowList())&&void 0")[0].exports;
const computePermissions = Object.values(PermissionUtils).find(
	(prop) =>
		typeof prop === "function" &&
		prop.toString().includes("computeLurkerPermissionsAllowList") &&
		!prop.toString().includes("forceRoles")
) as (options: object) => bigint;

const botTagClasses = spacepack.findByCode("px:", "rem:", "botTagOP:")[0].exports;
const memberListClasses = spacepack.findByCode("botTag:", "ownerIcon:")[0].exports;
const chatClasses = spacepack.findByCode("botTagCompact:", "botTagCozy:")[0].exports;

function TagComponent({
	user,
	guild,
	location,
	compact
}: {
	user;
	guild;
	location: "chat" | "memberList";
	compact?: boolean;
}) {
	const permissionsSet = getPermissionsSet(user, guild);

	const tags = (moonlight.getConfigOption("staffTags", "tags") ?? defaultConfig()) as Tag[];
	const tag = tags.find((tag) => tag.permissions.some((permission) => permissionsSet.has(permission)));

	if (tag === undefined) return undefined;

	const style = moonlight.getConfigOption("staffTags", "style");

	let className = `staffTags-tag staffTags-tag-${style} staffTags-tag-${location}`;

	if (compact) className += " staffTags-tag-compact";

	if (moonlight.getConfigOption("staffTags", "rounded") === true) className += " staffTags-tag-rounded";
	if (moonlight.getConfigOption("staffTags", "capitalizeText") === false) className += " staffTags-tag-uncapitalize";

	switch (style) {
		case "text":
			return <TextTagComponent tag={tag} location={location} compact={compact} className={className} />;
		case "icon":
			return <IconTagComponent tag={tag} className={className} />;
	}
}

function TextTagComponent({
	tag,
	className,
	location,
	compact
}: {
	tag: Tag;
	className: string;
	location: "chat" | "memberList";
	compact?: boolean;
}) {
	let classNamePrefix: string;

	switch (location) {
		case "memberList":
			classNamePrefix = `${botTagClasses.botTagRegular} ${memberListClasses.botTag} ${botTagClasses.px}`;
			break;
		case "chat":
			classNamePrefix = `${botTagClasses.botTagRegular} ${compact ? chatClasses.botTagCompact : chatClasses.botTagCozy} ${botTagClasses.rem}`;
			break;
	}

	return (
		<span className={classNamePrefix + " " + className} style={{ background: "#" + tag.color.toString(16) }}>
			<span className={botTagClasses.botText}>{tag.label}</span>
		</span>
	);
}

function IconTagComponent({ tag, className }: { tag: Tag; className: string }) {
	const Icon = Components[Icons[tag.icon]?.discordName?.concat("Icon")];

	if (Icon === undefined) return undefined;

	return (
		<Tooltip text={tag.label}>
			{(props) => (
				<Icon
					className={memberListClasses.icon + " " + className}
					color={"#" + tag.color.toString(16)}
					{...props}
				/>
			)}
		</Tooltip>
	);
}

function getPermissionsSet(user, guild) {
	const result: Set<string> = new Set();
	const permissions = computePermissions({ user, context: guild });

	if (permissions !== 0n) {
		for (const key in Permissions) {
			if ((permissions & Permissions[key]) !== 0n) {
				result.add(key);
			}
		}
	}

	if (guild.ownerId === user.id) result.add("OWNER");

	return result;
}

memberList.addDecorator(
	"staffTags-tag",
	({ user, channel }) =>
		channel?.guild_id && (
			<TagComponent user={user} guild={GuildStore.getGuild(channel.guild_id)} location="memberList" />
		),
	"bot-tag"
);
message.addToUsername(
	"staffTags-tag-cozy",
	({ message, guildId, compact }) =>
		!compact &&
		message?.author &&
		guildId && (
			<TagComponent user={message.author} guild={GuildStore.getGuild(guildId)} location="chat" compact={false} />
		),
	"username"
);
message.addToUsername(
	"staffTags-tag-compact",
	({ message, guildId, compact }) =>
		compact &&
		message?.author &&
		guildId && (
			<TagComponent user={message.author} guild={GuildStore.getGuild(guildId)} location="chat" compact={true} />
		),
	"username",
	true
);
