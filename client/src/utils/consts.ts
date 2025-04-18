const BASE_URL = `${import.meta.env.VITE_API_URL}` as const

export const API_URLS = {
    AUTH: BASE_URL + 'auth/',
    TASKS: BASE_URL + 'tasks/',
    ADMIN: BASE_URL + 'admin/'
} as const

export const ContentTypeHeader = { 'Content-Type': 'application/json' } as const;

export const METHODS = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
}

export const TASK_FILTERS = {
	ALL: 'all',
	ACTIVE: 'active',
	COMPLETED: 'completed',
} as const;

export const FILTERS_BUTTONS = {
	[TASK_FILTERS.ALL]: { literal: 'All', href: `/?filter=${TASK_FILTERS.ALL}` },
	[TASK_FILTERS.ACTIVE]: { literal: 'Active', href: `/?filter=${TASK_FILTERS.ACTIVE}` },
	[TASK_FILTERS.COMPLETED]: { literal: 'Completed', href: `/?filter=${TASK_FILTERS.COMPLETED}` },
} as const;