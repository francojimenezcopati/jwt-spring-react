/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import { Description, Done, Task, Title } from '../utils/types';
import { useEffect, useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';

interface TaskDetails {
	title: Title;
	description: Description;
	done: Done;
}

const TaskForm: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { filteredTasks } = useTaskContext();

	const initialState: TaskDetails = {
		title: '',
		description: '',
		done: false,
	} as const;

	const [formData, setFormData] = useState<TaskDetails>(initialState);
	const [task, setTask] = useState<Task | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
		value: string | boolean
	) => {
		console.log('change');

		setFormData({
			...formData,
			[e.target.name]: value, // Actualiza solo el campo modificado
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormData({
			...formData,
			done: true,
		});
		console.log(formData); // Datos del formulario
		// handleLogin(formData.email, formData.password);
		cleanUp();

			navigate('/tasks/');
	};

	const cleanUp = () => {
		setFormData(initialState);
	};

	const showTaskDetails = ({ task }: { task: Task }) => {
		// const task = await getTaskDetails(id);
		if (!task) return;

		setFormData({ title: task.title, description: task.description, done: task.done });
	};

	useEffect(() => {
		if (params.id) {
			const taskFiltered = filteredTasks.find((t) => t.id == parseInt(params.id!));

			if (taskFiltered) {
				setTask(taskFiltered);

				showTaskDetails({ task: taskFiltered });
			}
		} else {
			cleanUp();
		}
	}, [params, filteredTasks]);

	return (
		<div className='w-full max-w-sm m-5'>
			<form className='bg-[#bfc0e7] shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<div className='mb-4'>
					<label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='title'>
						Title
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='title'
						type='Text'
						placeholder='title...'
						name='title'
						value={formData.title}
						onChange={(e) => handleChange(e, e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='description'>
						Description
					</label>
					<textarea
						className='h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='description'
						// type="textarea"
						placeholder='Description...'
						name='description'
						value={formData.description}
						onChange={(e) => handleChange(e, e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<label htmlFor='default-checkbox' className='me-3 block text-gray-800 text-sm font-bold '>
							Completed:
						</label>
						<input
							name='done'
							id='default-checkbox'
							type='checkbox'
							value=''
							className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							checked={formData.done}
							onChange={(e) => handleChange(e, e.target.checked)}
						/>
					</div>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5 hover:cursor-pointer'
						type='button'
						onClick={(e) => handleSubmit(e)}
					>
						{params.id && task ? 'Update' : 'Save'}
					</button>
				</div>
			</form>
		</div>
	);

	// return (
	// 	<div>
	// 		{task.title}
	// 		<input type='text' />
	// 	</div>
	// );
};

export default TaskForm;
