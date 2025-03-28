import { createContext, useContext } from "react";
import { TaskContextType } from "../utils/types";

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error('useTaskContext must be used within a TaskProvider');
	}
	return context;
};