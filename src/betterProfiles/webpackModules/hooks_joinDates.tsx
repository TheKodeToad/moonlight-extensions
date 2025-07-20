import ErrorBoundary from "@moonlight-mod/wp/common_ErrorBoundary";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";

const MemberSince: React.FC<MemberSinceProps> = spacepack.findByCode("uvGmCw),")[0].exports.Z;

interface MemberSinceProps {
	userId: string;
	guildId?: string;
	betterProfiles$popout?: boolean;
}

function PopoutJoinDates({ user, guild }: { user; guild }) {
	if (!moonlight.getConfigOption("betterProfiles", "showJoinDates")) {
		return undefined;
	}

	return (
		<ErrorBoundary>
			<MemberSince userId={user?.id} guildId={guild?.id} betterProfiles$popout={true} />
		</ErrorBoundary>
	);
}

export function popoutJoinDates(props) {
	return <PopoutJoinDates {...props} />;
}
