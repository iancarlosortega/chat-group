export interface CreateChat {
	name: string;
	description?: string;
}

export interface Chat extends CreateChat {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
