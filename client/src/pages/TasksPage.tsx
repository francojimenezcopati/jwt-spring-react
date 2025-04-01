// import TaskCard from "../components/TaskCard";
// import { getTasks } from '../api/task.api'
import TaskCard from '../components/TaskCard';
import Footer from '../components/Footer';
import { useTaskContext } from '../hooks/useTaskContext';

const TasksPage = () => {
            // window.location.reload();
	const { filteredTasks } = useTaskContext();

	return (
		<div className='todoapp'>
			<ul className='todo-list'>
				{filteredTasks &&
					filteredTasks.map((task) => (
						<li key={task.id} className={`${task.done ? 'completed' : ''}`}>
							<TaskCard key={task.id} task={task} />
						</li>
					))}
			</ul>
			<Footer />
		</div>
	);
};

export default TasksPage;
