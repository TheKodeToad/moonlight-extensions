export interface Tag {
	label: string;
	icon: string;
	color: number;
	permissions: (keyof typeof Permissions | "OWNER")[];
}
