export interface TagData {
	label: string;
	permissions: (keyof typeof Permissions | "OWNER")[];
}
