export function shouldUseFullBioToggle() {
	return moonlight.getConfigOption<boolean>("profileTweaks", "fullBioToggle");
}

export function shouldExpandBioByDefault() {
	return moonlight.getConfigOption<boolean>("profileTweaks", "expandBioByDefault");
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
