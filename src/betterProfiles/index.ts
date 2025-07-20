import { ExtensionWebExports } from "@moonlight-mod/types";
import bioPatches from "./patches/bio";
import mainProfile from "./patches/mainProfile";

export const patches: ExtensionWebExports["patches"] = [...bioPatches, ...mainProfile];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = {
	hooks_bio: {},
	hooks_mainProfile: {}
};
