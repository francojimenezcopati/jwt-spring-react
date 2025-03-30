import { useState, useEffect, ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, refresh } from '../api/use.api';
import { Tokens } from '../utils/types';
import { AuthContext } from '../hooks/useAuthContext';

interface Props {
	children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	const localTokens = (): Tokens | null => JSON.parse(localStorage.getItem('tokens') ?? 'null');

	const [tokens, setTokens] = useState<Tokens | null>(localTokens);
	const [loading, setLoading] = useState(true);

	const isRefreshing = useRef(false);

	const handleLogin = async ({ email, password }: { email: string; password: string }) => {
		const tokensData = await login({ email, password });

		setTokens(tokensData);
		if (tokensData) {
			localStorage.setItem('tokens', JSON.stringify(tokensData));
			navigate('/');
		}
	};

	const handleLogout = async () => {
		const success = await logout({ accessToken: tokens!.accessToken });
		if (success) {
			setTokens(null);
			localStorage.removeItem('tokens');
			navigate('/login/');
		}
	};

	const updateToken = async () => {
		if (isRefreshing.current) return; // Evita múltiples ejecuciones simultáneas
		isRefreshing.current = true;

		console.log('update tokenn func');

		if (tokens) {
			const tokenRes = await refresh({ refreshToken: tokens.refreshToken });

			if (tokenRes !== null) {
				console.log('tokens setted');

				setTokens(tokenRes);
				localStorage.setItem('tokens', JSON.stringify(tokenRes));
			} else {
				handleLogout();
			}
		} else {
			handleLogout();
		}

		setLoading(false);
		isRefreshing.current = false;
	};

	useEffect(() => {
		updateToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const nineMinutes = 1000 * 60 * 9;
		const intervalId = setInterval(() => {
			if (tokens) {
				updateToken();
			}
		}, nineMinutes);

		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokens]);

	const contextData = {
		handleLogin,
		tokens,
		handleLogout,
	};

	return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthContext;
