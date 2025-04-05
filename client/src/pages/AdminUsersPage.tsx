import AdminPanel from '../components/AdminPanel';
import UserCard from '../components/UserCard';
import { useAuthContext } from '../hooks/useAuthContext';

const AdminUsersPage = () => {
	const { users } = useAuthContext();

	return (
		<div className='flex flex-col justify-center items-center mt-8 w-full'>
			<AdminPanel />
			<div className='todoapp w-full'>
				<ul className='todo-list'>
					{users &&
						users.map((user) => (
							<li key={user.id}>
								<UserCard key={user.id} user={user} />
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default AdminUsersPage;
