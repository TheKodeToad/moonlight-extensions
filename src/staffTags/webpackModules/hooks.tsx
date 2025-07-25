import ErrorBoundary from "@moonlight-mod/wp/common_ErrorBoundary";
import { GuildStore } from "@moonlight-mod/wp/common_stores";
import React from "@moonlight-mod/wp/react";
import { defaultConfig } from "@moonlight-mod/wp/staffTags_common";
import { TagComponent } from "@moonlight-mod/wp/staffTags_tags";
import { Tag } from "staffTags/types";

export function shouldShowCrown() {
	const tags = (moonlight.getConfigOption("staffTags", "tags") ?? defaultConfig()) as Tag[];
	return !tags.some((tag) => tag.permissions.includes("OWNER"));
}

function RepliedMessageTag({ referencedMessage, channel, repliedAuthor }) {
	const author = referencedMessage?.message?.author;
	const guildId = channel?.guild_id;

	if (author == null || guildId == null) return;

	return (
		<ErrorBoundary>
			<TagComponent
				guild={GuildStore.getGuild(guildId)}
				user={author}
				location="chat"
				compact={true}
				roleColor={repliedAuthor?.colorString}
			/>
		</ErrorBoundary>
	);
}

export function repliedMessageTag(props) {
	return <RepliedMessageTag {...props} />;
}

function MemberListTag({ user, channel, colorString }) {
	return (
		channel?.guild_id != null && (
			<ErrorBoundary>
				<TagComponent
					user={user}
					guild={GuildStore.getGuild(channel.guild_id)}
					location="memberList"
					roleColor={colorString}
				/>
			</ErrorBoundary>
		)
	);
}

export function memberListTag(props) {
	return <MemberListTag {...props} />;
}
