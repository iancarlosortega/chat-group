export interface User {
	id: string;
	fullName: string;
	email: string;
	roles: string[];
	isActive: boolean;
	avatarUrl?: string;
	age: number;
	birthDate: string;
	gender: string;
	createdAt: Date;
	updatedAt: Date;
}
