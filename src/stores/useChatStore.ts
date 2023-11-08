import { StateCreator, create } from 'zustand';
import { Chat } from '@/interfaces';

interface State {
	chats: Chat[];
	newChatsCounter: number;
}

interface Actions {
	setChats: (chats: Chat[]) => void;
	incrementNewChatsCounter: (value: number) => void;
	addChat: (chat: Chat) => void;
	addChats: (chats: Chat[]) => void;
}

const storeApi: StateCreator<State & Actions> = set => ({
	chats: [],
	newChatsCounter: 0,
	setChats: chats => set({ chats }),
	incrementNewChatsCounter: value =>
		set(state => ({ newChatsCounter: state.newChatsCounter + value })),
	addChat: chat => set(state => ({ chats: [chat, ...state.chats] })),
	addChats: newChats =>
		set(state => ({ chats: [...state.chats, ...newChats] })),
});

export const useChatStore = create<State & Actions>()(storeApi);
