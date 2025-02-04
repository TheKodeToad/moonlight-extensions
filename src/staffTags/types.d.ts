export interface Tag {
	label: string;
	icon: string;
	useRoleColor: boolean;
	color: number;
	permissions: (keyof typeof Permissions | "OWNER")[];
}
