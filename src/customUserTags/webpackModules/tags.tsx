import memberList from "@moonlight-mod/wp/componentEditor_memberList";
import React from "@moonlight-mod/wp/react";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { GuildStore } from "@moonlight-mod/wp/common_stores";
import { TagData } from "customUserTags/types";
import message from "@moonlight-mod/wp/componentEditor_messages";

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

function Tag({ user, guild, location, compact }: { user; guild; location: "chat" | "memberList"; compact?: boolean }) {
	const permissionsSet = getPermissionsSet(user, guild);

	const tags = moonlight.getConfigOption("customUserTags", "tags") as TagData[];
	const tag = tags.find((tag) => tag.permissions.some((permission) => permissionsSet.has(permission)));

	if (tag === undefined) return undefined;

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

	classes.push("customUserTags-tag");
	classes.push("customUserTags-tag-" + moonlight.getConfigOption("customUserTags", "style"));

	return (
		<span className={classes.join(" ")}>
			<span className={botTagClasses.botText}>{tag.label}</span>
		</span>
	);
}

memberList.addDecorator(
	"customUserTags",
	({ user, channel }) =>
		channel?.guild_id && <Tag user={user} guild={GuildStore.getGuild(channel.guild_id)} location="memberList" />,
	"bot-tag"
);
message.addToUsername(
	"customUserTags-cozy",
	({ message, guildId, compact }) =>
		!compact &&
		message?.author &&
		guildId && <Tag user={message.author} guild={GuildStore.getGuild(guildId)} location="chat" compact={false} />,
	"username"
);
message.addToUsername(
	"customUserTags-compact",
	({ message, guildId, compact }) =>
		compact &&
		message?.author &&
		guildId && <Tag user={message.author} guild={GuildStore.getGuild(guildId)} location="chat" compact={true} />,
	"username",
	true
);
