import { toast } from 'sonner';
import { API_URLS, ContentTypeHeader, METHODS } from '../utils/consts';
import { ApiResponse, Tokens } from '../utils/types';

export const register = async ({
	firstName,
	lastName,
	email,
	password,
}: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}): Promise<boolean> => {
	try {
		const rawRes = await fetch(API_URLS.AUTH + 'register', {
			method: METHODS.POST,
			headers: {
				...ContentTypeHeader,
			},
			body: JSON.stringify({ firstName, lastName, email, password }),
		});
		const res: ApiResponse<null> = await rawRes.json();

		if (res.success) {
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}

		return res.success;
	} catch (e) {
		toast.error((e as Error).message);
		return false;
	}
};

export const login = async ({ email, password }: { email: string; password: string }): Promise<Tokens | null> => {
	try {
		const rawRes = await fetch(API_URLS.AUTH + 'login', {
			method: METHODS.POST,
			headers: {
				...ContentTypeHeader,
			},
			body: JSON.stringify({ email, password }),
		});
		const res: ApiResponse<Tokens> = await rawRes.json();

		if (res.success) {
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}

		return res.content;
	} catch (e) {
		toast.error((e as Error).message);
		return null;
	}
};

export const logout = async ({ email }: { email: string }): Promise<boolean> => {
	console.log(email);

	try {
		const rawRes = await fetch(API_URLS.AUTH + 'logout', {
			method: METHODS.POST,
			headers: {
				...ContentTypeHeader,
			},
			body: JSON.stringify({ email }),
		});
		const res: ApiResponse<null> = await rawRes.json();

		if (res.success) {
			toast.success(res.message);
			return true;
		} else {
			toast.error(res.message);
			return false;
		}
	} catch (e) {
		toast.error((e as Error).message);
		return false;
	}
};

export const refresh = async ({ refreshToken }: { refreshToken: string }): Promise<Tokens | null> => {
	try {
		const rawRes = await fetch(API_URLS.AUTH + 'refresh', {
			method: METHODS.POST,
			headers: {
				...ContentTypeHeader,
			},
			body: JSON.stringify({ refreshToken }),
		});
		const res: ApiResponse<Tokens> = await rawRes.json();

		if (res.success) {
			// toast.success(res.message);
			console.log('Tokens refreshed');

			return res.content;
		} else {
			toast.error(res.message);
			return null;
		}
	} catch (e) {
		toast.error((e as Error).message);
		return null;
	}
};
