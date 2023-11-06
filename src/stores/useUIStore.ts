import { type StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
	isCreateChatModalOpen: boolean;
	isConfirmLogoutModalOpen: boolean;
}

interface Actions {
	setIsCreateChatModalOpen: (value: boolean) => void;
	setIsConfirmLogoutModalOpen: (value: boolean) => void;
}

const storeApi: StateCreator<State & Actions> = set => ({
	isCreateChatModalOpen: false,
	isConfirmLogoutModalOpen: false,
	setIsCreateChatModalOpen: value => set({ isCreateChatModalOpen: value }),
	setIsConfirmLogoutModalOpen: value =>
		set({ isConfirmLogoutModalOpen: value }),
});

export const useUIStore = create<State & Actions>()(devtools(storeApi));
