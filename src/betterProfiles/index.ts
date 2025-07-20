import { ExtensionWebExports } from "@moonlight-mod/types";
import bioPatches from "./patches/bio";
import joinDatesPatches from "./patches/joinDates";
import mainProfilePatches from "./patches/mainProfile";

export const patches: ExtensionWebExports["patches"] = [...bioPatches, ...mainProfilePatches, ...joinDatesPatches];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	hooks_bio: {},
	hooks_mainProfile: {
		dependencies: [{ ext: "common", id: "stores" }]
	},
	hooks_joinDates: {
		dependencies: [{ ext: "spacepack", id: "spacepack" }, "uvGmCw),"]
	}
};
