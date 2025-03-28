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