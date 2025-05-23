import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import UserForm from '../components/UserForm';

const AdminCreateUser = () => {
	const params = useParams();
    const navigate = useNavigate()
	const { users } = useAuthContext();
	const user = params.id ? users.find((t) => t.id === parseInt(params.id as string)) : null;
    
    const handleBackClick = () => {
        navigate(-1)
    }

	return (
		<div className='flex items-start justify-center'>
			<div className='translate-y-20 -translate-x-10 -mr-[44px] hover:cursor-pointer' onClick={() => handleBackClick()}>
				<img className='w-12' src='/public/backIcon.svg' alt='back' />
			</div>
			<div className=' mt-16 mb-7 flex flex-col justify-center items-center bg-gray-100 px-4 w-full'>
				<div className='w-full max-w-lg bg-white shadow-lg rounded-xl p-8'>
					<h2 className='text-4xl font-semibold text-gray-800 mb-2 text-center'>
						{user ? 'User details' : 'Create New User'}
					</h2>
					<p className='text-gray-600 text-sm mb-6 text-center'>
						{user ? '' : 'Fill in the details to add a new user.'}
					</p>

					<UserForm />
				</div>
			</div>
		</div>
	);
};

export default AdminCreateUser;
