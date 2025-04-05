import { Link, useLocation } from 'react-router-dom';

const AdminPanel = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	const isActive = (path: string) => currentPath === path;

	return (
		<div className='w-full max-w-4xl bg-white shadow-md rounded-xl -mb-24 p-8'>
			<h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Admin Panel</h2>
			<div className='flex justify-center gap-6 flex-wrap'>
				<Link
					to='/tasks'
					className={`px-6 py-3 text-lg font-semibold rounded-lg transition border shadow-md hover:shadow-lg ${
						isActive('/tasks')
							? 'bg-blue-600 text-white border-blue-600'
							: 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
					}`}
				>
					All tasks
				</Link>

				<Link
					to='/admin/users'
					className={`px-6 py-3 text-lg font-semibold rounded-lg transition border shadow-md hover:shadow-lg ${
						isActive('/admin/users')
							? 'bg-blue-600 text-white border-blue-600'
							: 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
					}`}
				>
					Manage Users
				</Link>

				<Link
					to='/admin/users/create'
					className={`px-6 py-3 text-lg font-semibold rounded-lg transition border shadow-md hover:shadow-lg ${
						isActive('/admin/users/create')
							? 'bg-indigo-600 text-white border-indigo-600'
							: 'text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
					}`}
				>
					Create User
				</Link>
			</div>
		</div>
	);
};

export default AdminPanel;
