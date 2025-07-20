import ErrorBoundary from "@moonlight-mod/wp/common_ErrorBoundary";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";

const MemberSince: React.FC<MemberSinceProps> = spacepack.findByCode("uvGmCw),")[0].exports.Z;

interface MemberSinceProps {
	userId: string;
	guildId?: string;
	betterProfiles$bare?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = spacepack.findByCode(
	'?"auto":"smooth"',
	'="header-secondary"}='
)[0].exports.Z;

interface ProfileSectionProps {
	heading?: string;
	children?: React.ReactNode;
}

function PopoutJoinDates({ user, guild, withLabel }: { user; guild; withLabel: boolean }) {
	if (!moonlight.getConfigOption("betterProfiles", "showJoinDates")) {
		return undefined;
	}

	return (
		<ErrorBoundary>
			<ProfileSection heading={withLabel ? "Member Since" : undefined}>
				<MemberSince userId={user?.id} guildId={guild?.id} betterProfiles$bare={!user.bot} />
			</ProfileSection>
		</ErrorBoundary>
	);
}

export function popoutJoinDates(props) {
	return <PopoutJoinDates {...props} />;
}

export function getDiscordUserSinceText(props: MemberSinceProps) {
	if (props.betterProfiles$bare) {
		return "Discord Member Since";
	} else {
		return undefined;
	}
}

export function getGuildMemberSinceText(props: MemberSinceProps, name: string) {
	if (props.betterProfiles$bare) {
		return "Joined " + name;
	} else {
		return name;
	}
}
