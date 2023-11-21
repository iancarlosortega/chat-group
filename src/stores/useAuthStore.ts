import { setCookie, deleteCookie } from 'cookies-next';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthService } from '@/services';
import { User } from '@/interfaces';

interface State {
	isAuthenticated: boolean;
	user?: User;
}

interface Actions {
	setUser: (user: User) => void;
	loginUser: (email: string, password: string) => Promise<void>;
	registerUser: (
		fullName: string,
		email: string,
		password: string
	) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
	logoutUser: () => void;
}

const storeApi: StateCreator<State & Actions> = set => ({
	isAuthenticated: false,
	user: undefined,
	setUser: user =>
		set(state => ({
			user: {
				...state.user,
				...user,
			},
		})),
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
	registerUser: async (fullName, email, password) => {
		try {
			const { token, user } = await AuthService.register(
				fullName,
				email,
				password
			);
			set({ user, isAuthenticated: true });
			setCookie('token', token);
		} catch (error) {
			set({ user: undefined, isAuthenticated: false });
			throw new Error('Problem with credentials');
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
	logoutUser: () => {
		deleteCookie('token');
		set({ user: undefined, isAuthenticated: false });
	},
});

export const useAuthStore = create<State & Actions>()(devtools(storeApi));
