// import TaskCard from "../components/TaskCard";
// import { getTasks } from '../api/task.api'
import TaskCard from '../components/TaskCard';
import Footer from '../components/Footer';
import { useTaskContext } from '../hooks/useTaskContext';
import { useAuthContext } from '../hooks/useAuthContext';
import AdminPanel from '../components/AdminPanel';

const TasksPage = () => {
	// window.location.reload();
	const { filteredTasks } = useTaskContext();
	const { userRole } = useAuthContext();

	return (
		<div className='flex flex-col justify-center items-center mt-8 w-full'>
			{userRole === 'ADMIN' && <AdminPanel />}
			<div className='todoapp w-full'>
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
		</div>
	);
};

export default TasksPage;
