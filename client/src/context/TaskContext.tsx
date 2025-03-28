import { useTasks } from '../hooks/useTasks'; // Ajusta la ruta según tu estructura
import { TaskContext } from '../hooks/useTaskContext';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
	const tasksData = useTasks();
	return <TaskContext.Provider value={tasksData}>{children}</TaskContext.Provider>;
};
