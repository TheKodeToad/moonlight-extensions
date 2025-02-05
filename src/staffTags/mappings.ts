import { ModuleExportType } from "@moonlight-mod/types";

// just to get the extension to work for the time being :)
// TODO: upstream this

declare module "@moonlight-mod/wp/discord/components/common/index" {
	const staffTags$ChevronLargeDownIcon: React.FunctionComponent<any>;
	const staffTags$ChevronLargeUpIcon: React.FunctionComponent<any>;
}

moonlight.moonmap.addExport("discord/components/common/index", "staffTags$HammerIcon", {
	type: ModuleExportType.Function,
	find: " 0 1-1.41 0l-1.42-1.42ZM7.76 7"
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$WrenchIcon", {
	type: ModuleExportType.Function,
	find: "M7.8 15.77c.7.43 1.2 1.14 1.2 "
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$ShieldIcon", {
	type: ModuleExportType.Function,
	find: "M4.27 5.22A2.66 2.66 0 0 0 3 7"
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$CrownIcon", {
	type: ModuleExportType.Function,
	find: "M5 18a1 1 0 0 0-1 1 3 3 0 0 0 "
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$KeyIcon", {
	type: ModuleExportType.Function,
	find: "M21.41 5.41A2 2 0 1 0 18.6 2.6"
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$ModerationIcon", {
	type: ModuleExportType.Function,
	find: "M5.26 12.45c.1.03.18.08.25.14l"
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$ChevronLargeDownIcon", {
	type: ModuleExportType.Function,
	find: "M3.3 8.3a1 1 0 0 1 1.4 0l7.3 7"
});
moonlight.moonmap.addExport("discord/components/common/index", "staffTags$ChevronLargeUpIcon", {
	type: ModuleExportType.Function,
	find: "M3.3 15.7a1 1 0 0 0 1.4 0L12 8"
});
