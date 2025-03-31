import { toast } from 'sonner';
import { API_URLS, METHODS } from '../utils/consts';
import { ApiResponse, Id, Task, TaskRequest, Tokens } from '../utils/types';

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

export const getTasks = async ({ accessToken }: { accessToken: string }): Promise<Task[] | null> => {
	try {
		const rawRes = await fetch(API_URLS.TASKS, {
			method: METHODS.GET,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
		});
		const res: ApiResponse<Task[]> = await rawRes.json();

		if (res.success) {
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

export const updateTask = async ({
	accessToken,
	id,
	task,
}: {
	accessToken: string;
	id: Id;
	task: TaskRequest;
}): Promise<Task | null> => {
	try {
		const rawRes = await fetch(API_URLS.TASKS + id, {
			method: METHODS.PUT,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify( task ),
		});
		const res: ApiResponse<Task | null> = await rawRes.json();

		if (res.success && res.content) {
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


export const deleteTask = async ({
	accessToken,
	id,
}: {
	accessToken: string;
	id: Id;
}): Promise<boolean> => {
	try {
		const rawRes = await fetch(API_URLS.TASKS + id, {
			method: METHODS.DELETE,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
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
