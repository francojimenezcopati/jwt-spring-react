// import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { Task } from '../utils/types';
import { useTaskContext } from '../hooks/useTaskContext';
// import { deleteTask } from "../api/task.api";

interface Props {
	task: Task;
}

const TaskCard: FC<Props> = ({ task }) => {
	const { handleCompleted: onToggleDone, handleDelete: deleteHandler } = useTaskContext();
	// const navigate = useNavigate();

	// const handleCardClick = (e) => {
	//     if (!e.target.matches("img")) {
	//         navigate(`/tasks/${task.id}`);
	//     }
	// };

	return (
		<div className='view '>
			<input
				type='checkbox'
				name='done'
				className='toggle'
				checked={task.done}
				onChange={(e) => onToggleDone({ id: task.id, done: e.target.checked })}
			/>
			<label>
				<div className='flex justify-between pr-10'>
					<span>{task.title} </span>

					<span className='text-lg text-gray-500'>{task.createdAt.toLocaleDateString()}</span>
				</div>
			</label>
			<button className='button-todo destroy hover:cursor-pointer' onClick={() => deleteHandler({ id: task.id })} />
		</div>
	);
};

export default TaskCard;
