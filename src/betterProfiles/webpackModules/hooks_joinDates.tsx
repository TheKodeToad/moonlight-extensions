import ErrorBoundary from "@moonlight-mod/wp/common_ErrorBoundary";
import { Tooltip } from "@moonlight-mod/wp/discord/components/common/index";
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
			<ProfileSection heading={withLabel ? "Created On" : undefined}>
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

const formatDate: (date: Date, format: string) => string = Object.values(
	spacepack.findByCode('"Invalid date given to startOfDay"')[0].exports
).find((prop) => prop instanceof Function && prop.toString().includes(',":").concat(')) as any;

function DateTooltipWrapper({ time, text }: { time: number; text: string }) {
	if (!moonlight.getConfigOption("betterProfiles", "detailedJoinDates")) {
		return text;
	}

	const tooltip = formatDate(new Date(time), "LLLL");

	return <Tooltip text={tooltip}>{(props) => <span {...props}>{text}</span>}</Tooltip>;
}

export function dateTooltipWrapper(props) {
	return <DateTooltipWrapper {...props} />;
}
