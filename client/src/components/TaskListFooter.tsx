import { useTaskContext } from '../hooks/useTaskContext';
import Filters from './Filters';

const TaskListFooter: React.FC = () => {
	const { activeCount, onClearCompleted, completedCount } = useTaskContext();
	const singleActiveCount = activeCount === 1;

	return (
		<footer className='footer'>
			<span className='todo-count'>
				<strong>{activeCount}</strong> pending task{!singleActiveCount && 's'}
			</span>

			<Filters />

			{completedCount > 0 && (
				<button className='clear-completed button-todo' onClick={onClearCompleted}>
					Delete completed
				</button>
			)}
		</footer>
	);
};

export default TaskListFooter;
