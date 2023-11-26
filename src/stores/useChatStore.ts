import { StateCreator, create } from 'zustand';
import { Chat } from '@/interfaces';

interface State {
	currenChat?: Chat;
	newChatsCounter: number;
}

interface Actions {
	setCurrentChat: (chat: Chat) => void;
	incrementNewChatsCounter: (value: number) => void;
}

const storeApi: StateCreator<State & Actions> = set => ({
	currenChat: undefined,
	newChatsCounter: 0,
	setCurrentChat: chat => set({ currenChat: chat }),
	incrementNewChatsCounter: value =>
		set(state => ({ newChatsCounter: state.newChatsCounter + value })),
});

export const useChatStore = create<State & Actions>()(storeApi);
