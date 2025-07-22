import { ExtensionWebExports } from "@moonlight-mod/types";
import bioPatches from "./patches/bio";
import joinDatesPatches from "./patches/joinDates";
import mainProfilePatches from "./patches/mainProfile";

export const patches: ExtensionWebExports["patches"] = [...bioPatches, ...mainProfilePatches, ...joinDatesPatches];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	bio: {},
	mainProfile: {
		dependencies: [{ ext: "common", id: "stores" }]
	},
	joinDates: {
		dependencies: [
			{ ext: "common", id: "ErrorBoundary" },
			{ id: "react" },
			{ ext: "spacepack", id: "spacepack" },
			"uvGmCw),",
			'="header-secondary"}=',
			'"Invalid date given to startOfDay"'
		]
	}
};
