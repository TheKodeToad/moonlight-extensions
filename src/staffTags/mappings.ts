import { ModuleExportType } from "@moonlight-mod/types";

const { moonmap } = moonlight;

// just to get the extension to work for the time being :)
// TODO: upstream this

function mapIcon(name: string, find: string) {
	const modName = "discord/modules/icons/web/" + name;
	moonmap.register({
		name: modName,
		find,
		process({ id }) {
			moonmap.addModule(id, modName);
			moonmap.addExport(modName, "default", {
				type: ModuleExportType.Function, 
				find,
			});
			return true;
		},
	})
}

mapIcon("staffTags$HammerIcon", " 0 1-1.41 0l-1.42-1.42ZM7.76 7")
mapIcon("staffTags$WrenchIcon", "M7.8 15.77c.7.43 1.2 1.14 1.2 ");
mapIcon("staffTags$ShieldIcon", "M17.05 8.76a4.7 4.7 0 0");
mapIcon("staffTags$GearIcon", "11.1 0 0 0-2.88 0ZM16 12a4");
mapIcon("staffTags$CrownIcon", "M5 18a1 1 0 0 0-1 1 3 3 0 0 0 ");
mapIcon("staffTags$KeyIcon", "M21.41 5.41A2 2 0 1 0 18.6 2.6");
mapIcon("staffTags$ModerationIcon", "M5.26 12.45c.1.03.18.08.25.14l");
mapIcon("staffTags$ChevronLargeDownIcon", "M3.3 8.3a1 1 0 0 1 1.4 0l7.3 7");
mapIcon("staffTags$ChevronLargeUpIcon", "M3.3 15.7a1 1 0 0 0 1.4 0L12 8");
