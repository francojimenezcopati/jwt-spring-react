import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
	const { tokens } = useAuthContext();
	return tokens ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
