import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskRequest } from '../utils/types';
import { useEffect, useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';

const TaskForm: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { filteredTasks, handleUpdate, handleCreate } = useTaskContext();

	const initialState: TaskRequest = {
		title: '',
		description: '',
		done: false,
	} as const;

	const [formData, setFormData] = useState<TaskRequest>(initialState);
	const [task, setTask] = useState<Task | null>(null);
	const [touched, setTouched] = useState<{ title: boolean; description: boolean }>({
		title: false,
		description: false,
	});

	useEffect(() => {
		if (params.id) {
			const taskToUpdate = filteredTasks.find((t) => t.id === parseInt(params.id!));
			if (taskToUpdate) {
				setTask(taskToUpdate);
				setFormData({
					title: taskToUpdate.title,
					description: taskToUpdate.description,
					done: taskToUpdate.done,
				});
			}
		} else {
			setFormData(initialState);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, filteredTasks]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;

		if (type === 'checkbox') {
			const target = e.target as HTMLInputElement;
			setFormData({ ...formData, [name]: target.checked });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTouched({ ...touched, [e.target.name]: true });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (params.id && task) {
			const updatedTask: Task = {
				id: task.id,
				...formData,
				createdAt: task.createdAt,
			};
			handleUpdate({ id: task.id, task: updatedTask });
		} else {
			handleCreate({ task: formData });
		}

		navigate('/tasks/');
	};

	const isValid = formData.title.trim() !== '' && formData.description.trim() !== '';

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-gray-50 shadow-md rounded-xl p-6'>
			<div>
				<label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor='title'>
					Title
				</label>
				<input
					id='title'
					type='text'
					name='title'
					placeholder='Enter task title'
                    maxLength={34}
					value={formData.title}
					onChange={handleChange}
					onBlur={handleBlur}
					className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300'
				/>
				{touched.title && formData.title.trim() === '' && (
					<p className='text-red-500 text-xs mt-1'>Title is required</p>
				)}
			</div>

			<div>
				<label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor='description'>
					Description
				</label>
				<textarea
					id='description'
					name='description'
					placeholder='Enter task description'
					value={formData.description}
					onChange={handleChange}
					onBlur={handleBlur}
					className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 h-32'
				></textarea>
				{touched.description && formData.description.trim() === '' && (
					<p className='text-red-500 text-xs mt-1'>Description is required</p>
				)}
			</div>

			<div className='flex items-center gap-2'>
				<input
					id='done'
					type='checkbox'
					name='done'
					checked={formData.done}
					onChange={handleChange}
					className='w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300'
				/>
				<label htmlFor='done' className='text-gray-700 text-sm font-semibold'>
					Mark as Completed
				</label>
			</div>

			<button
				type='submit'
				disabled={!isValid}
				className={`font-bold py-2 px-4 rounded-lg focus:ring focus:ring-blue-300 transition duration-200 ${
					isValid
						? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
						: 'bg-gray-300 text-gray-500 cursor-not-allowed'
				}`}
			>
				{params.id && task ? 'Update Task' : 'Create Task'}
			</button>
		</form>
	);
};

export default TaskForm;
