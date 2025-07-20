export function shouldUseFullBioToggle() {
	return moonlight.getConfigOption<boolean>("betterProfiles", "fullBioToggle");
}

export function shouldExpandBioByDefault() {
	return moonlight.getConfigOption<boolean>("betterProfiles", "expandBioByDefault");
}

export function getViewFullBioText(expanded: boolean) {
	if (shouldUseFullBioToggle()) {
		if (expanded) {
			return "Show Less";
		} else {
			return "Show Full Bio";
		}
	}

	return undefined;
}
