import { toast } from 'sonner';
import { API_URLS, ContentTypeHeader, METHODS } from '../utils/consts';
import { ApiResponse, Id, Task, TaskRequest, User, UserRequest } from '../utils/types';

export const getAllTasks = async ({ accessToken }: { accessToken: string }): Promise<Task[] | null> => {
	try {
		const rawRes = await fetch(API_URLS.ADMIN + 'tasks', {
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

export const updateAnyTask = async ({
	accessToken,
	id,
	task,
}: {
	accessToken: string;
	id: Id;
	task: TaskRequest;
}): Promise<Task | null> => {
	try {
		const rawRes = await fetch(API_URLS.ADMIN + 'tasks/' + id, {
			method: METHODS.PUT,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify(task),
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

export const deleteAnyTask = async ({ accessToken, id }: { accessToken: string; id: Id }): Promise<boolean> => {
	try {
		const rawRes = await fetch(API_URLS.ADMIN + 'tasks/' + id, {
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
			console.error(res.message);
		}

		return res.success;
	} catch (e) {
		console.error((e as Error).message);
		return false;
	}
};

export const getAllUsers = async ({ accessToken }: { accessToken: string }): Promise<User[]> => {
	try {
		const rawRes = await fetch(API_URLS.ADMIN + 'users', {
			method: METHODS.GET,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
		});
		const res: ApiResponse<User[]> = await rawRes.json();

		if (res.success) {
			return res.content;
		} else {
			console.error(res.message);
			return [];
		}
	} catch (e) {
		console.error((e as Error).message);
		return [];
	}
};

export const deleteUser = async ({ accessToken, id }: { accessToken: string; id: Id }): Promise<boolean> => {
	try {
		const rawRes = await fetch(API_URLS.ADMIN + 'users/' + id, {
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
		console.error((e as Error).message);
		return false;
	}
};

export const createUser = async ({ accessToken, user }: { accessToken: string, user: UserRequest }): Promise<User | null> => {
	try {
		const rawRes = await fetch(API_URLS.ADMIN + 'register', {
			method: METHODS.POST,
			headers: {
				...ContentTypeHeader,
				Authorization: 'Bearer ' + accessToken,
			},
            body: JSON.stringify(user)
		});
		const res: ApiResponse<User> = await rawRes.json();

		if (res.success) {
			return res.content;
		} else {
			toast.error(res.message);
			return null;
		}
	} catch (e) {
		console.error((e as Error).message);
		return null;
	}
};
