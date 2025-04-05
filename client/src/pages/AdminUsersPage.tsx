import AdminPanel from '../components/AdminPanel';
import UserCard from '../components/UserCard';
import { useAuthContext } from '../hooks/useAuthContext';
import { User } from '../utils/types';

const AdminUsersPage = () => {
	const { users } = useAuthContext();

	const mockUsers: User[] = [
		{
			id: 1,
			firstName: 'Franco',
			lastName: 'Jimenez',
			email: 'franco.jimenez@example.com',
			role: 'ADMIN',
			createdAt: '2024-10-01',
		},
		{
			id: 2,
			firstName: 'Lucía',
			lastName: 'Pérez',
			email: 'lucia.perez@example.com',
			role: 'USER',
			createdAt: '2024-10-02',
		},
		{
			id: 3,
			firstName: 'Martín',
			lastName: 'Gómez',
			email: 'martin.gomez@example.com',
			role: 'USER',
			createdAt: '2024-10-03',
		},
	];

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
