import { createContext, useContext } from "react";
import { AuthContextType } from "../utils/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}
	return context;
};