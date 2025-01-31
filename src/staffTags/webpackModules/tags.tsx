import memberList from "@moonlight-mod/wp/componentEditor_memberList";
import React from "@moonlight-mod/wp/react";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { GuildStore } from "@moonlight-mod/wp/common_stores";
import { Tag } from "staffTags/types";
import Components from "@moonlight-mod/wp/discord/components/common/index";
import message from "@moonlight-mod/wp/componentEditor_messages";
import { Icons } from "@moonlight-mod/wp/staffTags_constants";

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

	const tags = moonlight.getConfigOption("staffTags", "tags") as Tag[];
	const tag = tags.find((tag) => tag.permissions.some((permission) => permissionsSet.has(permission)));

	if (tag === undefined) return undefined;

	const props = { tag, location, compact };

	switch (moonlight.getConfigOption("staffTags", "style")) {
		case "text":
			return <TextTagComponent {...props} />;
		case "icon":
			return <IconTagComponent {...props} />;
	}
}

function TextTagComponent({
	tag,
	location,
	compact
}: {
	tag: Tag;
	location: "chat" | "memberList";
	compact?: boolean;
}) {
	const classes = [botTagClasses.botTagRegular];

	switch (location) {
		case "memberList":
			classes.unshift(memberListClasses.botTag);
			classes.push(botTagClasses.px);
			break;
		case "chat":
			classes.unshift(compact ? chatClasses.botTagCompact : chatClasses.botTagCozy);
			classes.push(botTagClasses.rem);
			break;
	}

	classes.push("staffTags-tag");
	classes.push("staffTags-tag-text");
	if (moonlight.getConfigOption("staffTags", "rounded")) classes.push("staffTags-tag-rounded");

	return (
		<span className={classes.join(" ")}>
			<span className={botTagClasses.botText}>{tag.label}</span>
		</span>
	);
}

function IconTagComponent({ tag, location, compact }: { tag: Tag; location: "chat" | "memberList"; compact?: boolean }) {
	const Icon = Components[Icons[tag.icon].discordName?.concat("Icon")];

	if (Icon === undefined) return undefined;

	return <Icon />;
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
