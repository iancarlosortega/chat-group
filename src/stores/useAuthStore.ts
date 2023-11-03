import { setCookie } from 'cookies-next';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthService } from '@/services';
import { User } from '@/interfaces';

interface State {
	isAuthenticated: boolean;
	user?: User;
}

interface Actions {
	loginUser: (email: string, password: string) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
}

const storeApi: StateCreator<State & Actions> = set => ({
	isAuthenticated: false,
	user: undefined,
	loginUser: async (email, password) => {
		try {
			const { token, user } = await AuthService.login(email, password);
			set({ user, isAuthenticated: true });
			setCookie('token', token);
		} catch (error) {
			set({ user: undefined, isAuthenticated: false });
			throw new Error('Not valid credentials');
		}
	},
	checkAuthStatus: async () => {
		try {
			const { token, user } = await AuthService.checkAuthStatus();
			set({ user, isAuthenticated: true });
			setCookie('token', token);
		} catch (error) {
			set({ user: undefined, isAuthenticated: false });
			throw new Error('Token is not valid');
		}
	},
});

export const useAuthStore = create<State & Actions>()(devtools(storeApi));
