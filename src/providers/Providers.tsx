import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Toaster richColors position='top-right' expand />
			{children}
		</>
	);
};
