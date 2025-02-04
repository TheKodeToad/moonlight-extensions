import { GuildStore } from "@moonlight-mod/wp/common_stores";
import React from "@moonlight-mod/wp/react";
import { defaultConfig } from "@moonlight-mod/wp/staffTags_constants";
import { TagComponent } from "@moonlight-mod/wp/staffTags_tags";
import { Tag } from "staffTags/types";

export function shouldShowCrown() {
	const tags = (moonlight.getConfigOption("staffTags", "tags") ?? defaultConfig()) as Tag[];
	return !tags.some((tag) => tag.permissions.includes("OWNER"));
}

export function repliedMessageTag({ referencedMessage, channel, repliedAuthor }) {
	const author = referencedMessage?.message?.author;
	const guildId = channel?.guild_id;

	if (author == null || guildId == null) return;

	return (
		<TagComponent
			guild={GuildStore.getGuild(guildId)}
			user={author}
			location="chat"
			compact={true}
			roleColor={repliedAuthor?.colorString}
		/>
	);
}
