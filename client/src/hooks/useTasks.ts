import { useEffect, useReducer } from 'react';
import { Done, FilterValue, Id, Task, TaskContextType } from '../utils/types';
import { TASK_FILTERS } from '../utils/consts';
import { getTasks } from '../api/use.api';
import { useAuthContext } from './useAuthContext';

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
	| { type: 'COMPLETED'; payload: { id: Id; done: Done } }
	| { type: 'FILTER_CHANGE'; payload: { filter: FilterValue } }
	| { type: 'DELETE'; payload: { id: Id } };
// | { type: 'CREATE'; payload: {title: Title, description: Description, done: Done}}
// | { type: 'UPDATE'; payload: { id: Id, title: Title, description: Description, done: Done } }

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
		case 'COMPLETED': {
			const { id, done } = action.payload;

			const updatedTasks = state.tasks.map((task) => {
				if (task.id === id) {
					task.done = done;
				}
				return task;
			});

			return {
				...state,
				tasks: updatedTasks,
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
		// case 'UPDATE': {
		// 	const { id, title, description, done } = action.payload;
		//     const {tasks} = state

		//     const taskToUpdate = tasks.find((task) => task.id != id);
		// 	return {
		// 		...state,
		// 		tasks,
		// 	};
		// }
	}
};

export const useTasks = (): TaskContextType => {
	const [{ tasks, filterSelected }, dispatch] = useReducer(reducer, initialState);
	const { tokens } = useAuthContext();

	const handleDelete = ({ id }: { id: Id }) => {
		dispatch({ type: 'DELETE', payload: { id } });
	};

	const handleCompleted = ({ id, done }: Pick<Task, 'id' | 'done'>) => {
		dispatch({ type: 'COMPLETED', payload: { id, done } });
	};

	const handleFilterChange = (filter: FilterValue) => {
		dispatch({ type: 'FILTER_CHANGE', payload: { filter } });

		const params = new URLSearchParams(window.location.search);
		params.set('filter', filter);
		window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
	};

	const onClearCompleted = () => {
		dispatch({ type: 'CLEAR_COMPLETED' });
	};

	useEffect(() => {
        console.log("effect de tasks");
        
		getTasks({ accessToken: tokens!.accessToken }).then((tasks) => {
			let taskToDispatch: Task[];
			if (tasks === null) {
				taskToDispatch = [];
			} else {
				taskToDispatch = tasks;
			}

			dispatch({ type: 'INIT_TASKS', payload: { tasks: taskToDispatch } });
		});
		// const mockTasks: Task[] = [
		// 	{
		// 		id: 1,
		// 		title: 'Task from hopp',
		// 		description: 'Desc from tiny',
		// 		done: false,
		// 		createdAt: new Date(),
		// 	},
		// 	{
		// 		id: 2,
		// 		title: 'Task mocked',
		// 		description: 'Desc mocked',
		// 		done: true,
		// 		createdAt: new Date(),
		// 	},
		// 	{
		// 		id: 3,
		// 		title: 'Clean that',
		// 		description: 'Do it',
		// 		done: false,
		// 		createdAt: new Date(),
		// 	},
		// ];

		// dispatch({ type: 'INIT_TASKS', payload: { tasks: mockTasks } });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		onClearCompleted,
		handleCompleted,
		handleFilterChange,
		handleDelete,
		filteredTasks,
	};
};
