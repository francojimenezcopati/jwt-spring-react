import { Link } from 'react-router-dom';

const AdminPanel = () => {
	return (
		<div className='flex flex-col justify-center items-center -mb-24 bg-slate-300/70 rounded-lg p-9 gap-7'>
			<span className='text-center text-3xl w-full font-bold'>Admin panel:</span>
			<div className='flex justify-center items-center gap-7'>
				<Link className='text-2xl text-white p-4 rounded bg-blue-700  transition' to='/admin/users'>
					Manage users
				</Link>
				<Link className='text-2xl text-white p-4 rounded bg-blue-700  transition' to='/admin/create-user'>
					Create user
				</Link>
			</div>
		</div>
	);
};

export default AdminPanel;
