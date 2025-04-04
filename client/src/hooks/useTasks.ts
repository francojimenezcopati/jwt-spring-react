import { useEffect, useReducer } from 'react';
import { FilterValue, Id, Task, TaskContextType, TaskRequest } from '../utils/types';
import { TASK_FILTERS } from '../utils/consts';
import { createTask, deleteAllTasks, deleteTask, getTasks, updateTask } from '../api/tasks.api';
import { useAuthContext } from './useAuthContext';
import { getAllTasks, updateAnyTask } from '../api/admin.api';

const initialState: State = {
	tasks: [],
	filterSelected: (() => {
		// read from url query params using URLSearchParams
		const params = new URLSearchParams(window.location.search);
		const filter = params.get('filter') as FilterValue | null;
		if (filter === null) return TASK_FILTERS.ALL;
		// check filter is valid, if not return ALL
		return Object.values(TASK_FILTERS).includes(filter) ? filter : TASK_FILTERS.ALL;
	})(),
};

type Action =
	| { type: 'INIT_TASKS'; payload: { tasks: Task[] } }
	| { type: 'CLEAR_COMPLETED' }
	| { type: 'CREATE'; payload: { task: Task } }
	| { type: 'UPDATE'; payload: { id: Id; task: Task } }
	| { type: 'FILTER_CHANGE'; payload: { filter: FilterValue } }
	| { type: 'DELETE'; payload: { id: Id } };

interface State {
	tasks: Task[];
	filterSelected: FilterValue;
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'INIT_TASKS': {
			const { tasks } = action.payload;
			return {
				...state,
				tasks,
			};
		}
		case 'CLEAR_COMPLETED': {
			const { tasks } = state;
			return {
				...state,
				tasks: tasks.filter((task) => !task.done),
			};
		}
		case 'CREATE': {
			const { task } = action.payload;
			const tasks = [...state.tasks];
			tasks.push(task);

			return {
				...state,
				tasks,
			};
		}
		case 'UPDATE': {
			const { id, task } = action.payload;
			return {
				...state,
				tasks: state.tasks.map((t) => (t.id === id ? task : t)),
			};
		}
		case 'FILTER_CHANGE': {
			return {
				...state,
				filterSelected: action.payload.filter,
			};
		}
		case 'DELETE': {
			const { tasks } = state;
			const { id } = action.payload;

			return {
				...state,
				tasks: tasks.filter((task) => task.id != id),
			};
		}
	}
};

export const useTasks = (): TaskContextType => {
	const [{ tasks, filterSelected }, dispatch] = useReducer(reducer, initialState);
	const { tokens, userRole } = useAuthContext();
	const accessToken = tokens ? tokens.accessToken : '';

	const handleDelete = async ({ id }: { id: Id }) => {
		const success = await deleteTask({ accessToken, id });

		if (success) {
			dispatch({ type: 'DELETE', payload: { id } });
		}
	};

	const handleCreate = async ({ task }: { task: TaskRequest }) => {
		const createdTask = await createTask({ accessToken, task });

		if (createdTask) {
			dispatch({ type: 'CREATE', payload: { task: createdTask } });
		}
	};

	const handleUpdate = async ({ id, task }: { id: Id; task: Task }) => {
		const taskRequest: TaskRequest = {
			title: task.title,
			description: task.description,
			done: task.done,
		};

		let updatedTask: Task | null = null;

		if (userRole === 'ADMIN') {
			updatedTask = await updateAnyTask({ accessToken, id, task: taskRequest });
		} else if (userRole === 'USER') {
			updatedTask = await updateTask({ accessToken, id, task: taskRequest });
		}

		if (updatedTask) {
			dispatch({ type: 'UPDATE', payload: { id, task: updatedTask } });
		}
	};

	const handleFilterChange = ({ filter }: { filter: FilterValue }) => {
		dispatch({ type: 'FILTER_CHANGE', payload: { filter } });

		const params = new URLSearchParams(window.location.search);
		params.set('filter', filter);
		window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
	};

	const onClearCompleted = async () => {
		const success = await deleteAllTasks({ accessToken });
		if (success) {
			dispatch({ type: 'CLEAR_COMPLETED' });
		}
	};

	useEffect(() => {
		if (tokens) {
			let initialTasks: Task[] = [];
            console.log(userRole);

			if (userRole === 'ADMIN') {
				getAllTasks({ accessToken: tokens.accessToken }).then((tasks) => {
					if (tasks !== null) {
						initialTasks = tasks;
					}
					dispatch({ type: 'INIT_TASKS', payload: { tasks: initialTasks } });
				});
			} else if (userRole === 'USER') {
				getTasks({ accessToken: tokens.accessToken }).then((tasks) => {
					if (tasks !== null) {
						initialTasks = tasks;
					}
					dispatch({ type: 'INIT_TASKS', payload: { tasks: initialTasks } });
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokens]);

	const activeCount = tasks.filter((task) => !task.done).length;
	const completedCount = tasks.length - activeCount;

	const filteredTasks = tasks.filter((task) => {
		if (filterSelected === TASK_FILTERS.ACTIVE) return !task.done;
		if (filterSelected === TASK_FILTERS.COMPLETED) return task.done;
		return task;
	});

	return {
		activeCount,
		completedCount,
		filterSelected,
		handleFilterChange,
		filteredTasks,
		handleCreate,
		handleUpdate,
		handleDelete,
		onClearCompleted,
	};
};
