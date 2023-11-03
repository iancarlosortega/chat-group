import { type StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
	isCreateChatModalOpen: boolean;
}

interface Actions {
	setIsCreateChatModalOpen: (value: boolean) => void;
}

const storeApi: StateCreator<State & Actions> = set => ({
	isCreateChatModalOpen: false,
	setIsCreateChatModalOpen: value => set({ isCreateChatModalOpen: value }),
});

export const useUIStore = create<State & Actions>()(devtools(storeApi));
