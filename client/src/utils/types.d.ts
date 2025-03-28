import { TASK_FILTERS } from "./consts";

export interface Task {
    id: number,
    title: string,
    description: string,
    done: boolean,
    createdAt: Date
}

export type Id = Task['id'];
export type Title = Task['title'];
export type Description = Task['description'];
export type Done = Task['done'];
export type CreatedAt = Task['createdAt'];

export type FilterValue = typeof TASK_FILTERS[keyof typeof TASK_FILTERS]


interface TaskContextType {
	activeCount: number;
	completedCount: number;
	filteredTasks: Task[];
	filterSelected: FilterValue;
	onClearCompleted: () => void;
	handleCompleted: ({ id, done }: Pick<Task, 'id' | 'done'>) => void;
	handleFilterChange: (filter: FilterValue) => void;
	handleDelete: (id: { id: number }) => void;
}