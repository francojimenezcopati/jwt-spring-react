import { useNavigate } from 'react-router-dom';
import { User } from '../utils/types';
import { useAuthContext } from '../hooks/useAuthContext';

interface Props {
user: User
}

const UserCard: React.FC<Props> = ({user}) => {
    const {handleDeleteUser} = useAuthContext()
	const navigate = useNavigate();

	const handleUserClick = () => {
		navigate(`/admin/users/${user.id}`);
	};

	return (
		<div className='view '>
			<label className='user-card'>
				<div className='flex justify-between items-center pr-10 '>
					<span className='hover:cursor-pointer' onClick={() => handleUserClick()}>
						{user.email}{' '}
					</span>
					<div className='flex flex-col justify-center items-end'>
						<span className='text-lg text-gray-500'>{user.createdAt}</span>
					</div>
				</div>
			</label>
			<button className='button-todo destroy hover:cursor-pointer' onClick={() => handleDeleteUser({ id: user.id })} />
		</div>
	);
};

export default UserCard;
