export interface Tag {
	label: string;
	icon: string;
	permissions: (keyof typeof Permissions | "OWNER")[];
}
