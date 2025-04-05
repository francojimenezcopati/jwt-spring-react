import TaskForm from '../components/TaskForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskContext } from '../hooks/useTaskContext';

const TaskDetails: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { filteredTasks } = useTaskContext();
	const task = params.id ? filteredTasks.find((t) => t.id === parseInt(params.id as string)) : null;

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<div className='flex items-start justify-center'>
			<div className='translate-y-20 -translate-x-10 -mr-[44px] hover:cursor-pointer' onClick={() => handleBackClick()}>
				<img className='w-12' src='/public/backIcon.svg' alt='back' />
			</div>
			<div className='w-full mt-16 mb-7 flex flex-col justify-center items-center bg-gray-100 px-4'>
				<div className='w-full max-w-lg bg-white shadow-lg rounded-xl p-8'>
					<h2 className='text-4xl font-semibold text-gray-800 mb-2 text-center'>
						{task ? 'Edit Task' : 'Create New Task'}
					</h2>
					<p className='text-gray-600 text-sm mb-6 text-center'>
						{task ? 'Modify the details of your task below.' : 'Fill in the details to add a new task.'}
					</p>

					<TaskForm />
				</div>
			</div>
		</div>
	);
};

export default TaskDetails;
