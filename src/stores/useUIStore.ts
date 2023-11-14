import { type StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
	isSidebarOpen: boolean;
	isCreateChatModalOpen: boolean;
	isConfirmLogoutModalOpen: boolean;
	isChatInformationOpen: boolean;
}

interface Actions {
	setIsSidebarOpen: (value: boolean) => void;
	setIsCreateChatModalOpen: (value: boolean) => void;
	setIsConfirmLogoutModalOpen: (value: boolean) => void;
	setIsChatInformationOpen: (value: boolean) => void;
}

const storeApi: StateCreator<State & Actions> = set => ({
	isSidebarOpen: false,
	isCreateChatModalOpen: false,
	isConfirmLogoutModalOpen: false,
	isChatInformationOpen: false,
	setIsSidebarOpen: value => set({ isSidebarOpen: value }),
	setIsCreateChatModalOpen: value => set({ isCreateChatModalOpen: value }),
	setIsConfirmLogoutModalOpen: value =>
		set({ isConfirmLogoutModalOpen: value }),
	setIsChatInformationOpen: value => set({ isChatInformationOpen: value }),
});

export const useUIStore = create<State & Actions>()(devtools(storeApi));
