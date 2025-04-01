import { useState, useEffect, ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, refresh, register } from '../api/use.api';
import { Tokens } from '../utils/types';
import { AuthContext } from '../hooks/useAuthContext';
import { jwtDecode } from 'jwt-decode';

interface Props {
	children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	const localTokens = (): Tokens | null => JSON.parse(localStorage.getItem('tokens') ?? 'null');
	const localEmail = (): { email: string } | null => JSON.parse(localStorage.getItem('email') ?? 'null');

	const [tokens, setTokens] = useState<Tokens | null>(localTokens);
	const [userEmail, setUserEmail] = useState<string | null>(localEmail()?.email ?? null);
	const [loading, setLoading] = useState(true);

	const isRefreshing = useRef(false);

	const handleRegister = async ({
		firstName,
		lastName,
		email,
		password,
	}: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}) => {
		const success = await register({ firstName, lastName, email, password });

		if (success) {
			navigate('/login');
		}
	};

	const handleLogin = async ({ email, password }: { email: string; password: string }) => {
		const tokensData = await login({ email, password });

		setTokens(tokensData);
		if (tokensData) {
			const email = jwtDecode(tokensData.accessToken).sub!;
			setUserEmail(email);
			localStorage.setItem('tokens', JSON.stringify(tokensData));
			localStorage.setItem('email', JSON.stringify(email));

			navigate('/');
		}
	};

	const handleLogout = async () => {
		if (userEmail) {
			await logout({ email: userEmail });
		}
		setTokens(null);
		setUserEmail(null);
		localStorage.removeItem('tokens');
		localStorage.removeItem('email');
		navigate('/login/');
	};

	const updateToken = async () => {
		if (isRefreshing.current) return; // Evita múltiples ejecuciones simultáneas
		isRefreshing.current = true;

		if (tokens) {
			const tokenRes = await refresh({ refreshToken: tokens.refreshToken });

			if (tokenRes !== null) {
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
		handleRegister,
		handleLogin,
		tokens,
		handleLogout,
	};

	return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthContext;
