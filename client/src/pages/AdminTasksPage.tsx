import TaskCard from '../components/TaskCard';
import Footer from '../components/Footer';
import { useTaskContext } from '../hooks/useTaskContext';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const AdminTasksPage = () => {
	const { filteredTasks } = useTaskContext();
	const { userRole } = useAuthContext();

	return (
		<div className='flex flex-col justify-center items-center mt-8 w-full'>
			{userRole === 'ADMIN' ? (
				<div className='flex flex-col justify-center items-center -mb-24 bg-slate-300/70 rounded-lg p-9 gap-7'>
					<span className='text-center text-3xl w-full font-bold'>Admin panel:</span>
					<div className='flex justify-center items-center gap-7'>
						<Link className='text-2xl text-white p-4 rounded bg-blue-700  transition' to='/admin/tasks'>
							All tasks
						</Link>
						<Link className='text-2xl text-white p-4 rounded bg-blue-700  transition' to='/admin/tasks'>
							All users
						</Link>
						<Link className='text-2xl text-white p-4 rounded bg-blue-700  transition' to='/admin/tasks'>
							Create user
						</Link>
					</div>
				</div>
			) : (
				<></>
			)}
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

export default AdminTasksPage;
