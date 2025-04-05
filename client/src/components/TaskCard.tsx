// import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { Task } from '../utils/types';
import { useTaskContext } from '../hooks/useTaskContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
// import { deleteTask } from "../api/task.api";

interface Props {
	task: Task;
}

const TaskCard: FC<Props> = ({ task }) => {
	const { handleDelete: deleteHandler, handleUpdate } = useTaskContext();
	const { userRole } = useAuthContext();
	const navigate = useNavigate();

	const handleTaskClick = () => {
		navigate(`/tasks/${task.id}`);
	};

	return (
		<div className='view '>
			<input
				type='checkbox'
				name='done'
				className='toggle'
				checked={task.done}
				onChange={(e) => handleUpdate({ id: task.id, task: { ...task, done: e.target.checked } })}
			/>
			<label>
				<div className='flex justify-between items-center pr-10 '>
					<span className='hover:cursor-pointer w-full' onClick={() => handleTaskClick()}>
						{task.title}{' '}
					</span>
					<div className='flex flex-col justify-center items-end min-w-fit'>
                        {userRole === "ADMIN" && 
						<span className='text-lg text-gray-500'>{task.userEmail}</span>
                        }
						<span className='text-lg text-gray-500'>{task.createdAt}</span>
					</div>
				</div>
			</label>
			<button className='button-todo destroy hover:cursor-pointer' onClick={() => deleteHandler({ id: task.id })} />
		</div>
	);
};

export default TaskCard;
