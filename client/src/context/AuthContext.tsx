import { useState, useEffect, ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, refresh, register } from '../api/auth.api';
import { AuthContextType, TokenClaims, Tokens, UserRoles } from '../utils/types';
import { AuthContext } from '../hooks/useAuthContext';
import { jwtDecode } from 'jwt-decode';

interface Props {
	children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	const localTokens = (): Tokens | null => JSON.parse(localStorage.getItem('tokens') ?? 'null');

	const [tokens, setTokens] = useState<Tokens | null>(localTokens);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [userRole, setUserRole] = useState<UserRoles | null>(null);
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
			const { sub, role } = jwtDecode<TokenClaims>(tokensData.accessToken);
			setUserEmail(sub!);
			setUserRole(role as UserRoles);

			localStorage.setItem('tokens', JSON.stringify(tokensData));

			navigate('/');
		}
	};

	const handleLogout = async () => {
		if (userEmail) {
			await logout({ email: userEmail });
		}
		setTokens(null);
		setUserEmail(null);
		setUserRole(null);
		localStorage.removeItem('tokens');
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
		if (tokens) {
			const claims = jwtDecode<TokenClaims>(tokens.accessToken);
			setUserEmail(claims.sub!);
			setUserRole(claims.role as UserRoles);
		}

		const nineMinutes = 1000 * 60 * 9;
		const intervalId = setInterval(() => {
			if (tokens) {
				updateToken();
			}
		}, nineMinutes);

		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokens]);

	const contextData: AuthContextType = {
		handleRegister,
		handleLogin,
		tokens,
		userRole,
		handleLogout,
	};

	return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthContext;
