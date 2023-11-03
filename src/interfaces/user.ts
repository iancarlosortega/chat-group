export interface User {
	id: string;
	fullName: string;
	email: string;
	roles: string[];
	isActive: boolean;
	avatarUrl?: string;
	createdAt: any;
	updatedAt: any;
}
