import { toast } from 'sonner';
import { API_URLS, ContentTypeHeader, METHODS } from '../utils/consts';
import { ApiResponse, Id, Task, TaskRequest } from '../utils/types';

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
