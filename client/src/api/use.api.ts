import { toast } from 'sonner';
import { API_URLS, METHODS } from '../utils/consts';
import { ApiResponse, Task, Tokens } from '../utils/types';

const ContentTypeHeader = { 'Content-Type': 'application/json' } as const;

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

export const logout = async ({ accessToken }: { accessToken: string }): Promise<boolean> => {
	console.log(accessToken);

	try {
		const rawRes = await fetch(API_URLS.AUTH + 'logout', {
			method: METHODS.POST,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
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
	console.log(refreshToken);

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


export const getTasks = async ({ accessToken }: { accessToken: string }): Promise<Task[] | null> => {
    console.log(accessToken);
    
	try {
		const rawRes = await fetch(API_URLS.TASKS , {
			method: METHODS.GET,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
		});
		const res: ApiResponse<Task[]> = await rawRes.json();

		if (res.success) {
			toast.success(res.message);
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
