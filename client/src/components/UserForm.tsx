import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, UserRequest } from '../utils/types';
import { useAuthContext } from '../hooks/useAuthContext';

const UserForm: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { users } = useAuthContext();

	const initialState: UserRequest = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: 'USER',
	} as const;

	const [formData, setFormData] = useState<UserRequest>(initialState);
	const [user, setUser] = useState<User | null>(null);
	const [touched, setTouched] = useState<{
		firstName: boolean;
		lastName: boolean;
		email: boolean;
		password: boolean;
	}>({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
	});

	useEffect(() => {
		if (params.id) {
			const userToUpdate = users.find((user) => user.id === parseInt(params.id!));
			if (userToUpdate) {
				setUser(userToUpdate);
				setFormData({
					firstName: userToUpdate.firstName,
					lastName: userToUpdate.lastName,
					email: userToUpdate.email,
					role: userToUpdate.role,
					password: '',
				});
			}
		} else {
			setFormData(initialState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, users]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTouched({ ...touched, [e.target.name]: true });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log(formData);

		// handleCreate({ user: formData });

		// navigate('admin/users');
	};

	const isValid =
		formData.email.trim() !== '' &&
		formData.firstName.trim() !== '' &&
		formData.lastName.trim() !== '' &&
		formData.password.trim() !== '';

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-gray-50 shadow-md rounded-xl p-6'>
			<div>
				<label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor='firstName'>
					First name
				</label>
				<input
					id='firstName'
					readOnly={user !== null}
					disabled={user !== null}
					type='text'
					name='firstName'
					placeholder='Enter the first name'
					maxLength={34}
					value={formData.firstName}
					onChange={handleChange}
					onBlur={handleBlur}
					className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 ${
						user !== null ? 'bg-slate-300' : ''
					}`}
				/>
				{touched.firstName && formData.firstName.trim() === '' && (
					<p className='text-red-500 text-xs mt-1'>First name is required</p>
				)}
			</div>

			<div>
				<label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor='lastName'>
					Last name
				</label>
				<input
					id='lastName'
					readOnly={user !== null}
					disabled={user !== null}
					name='lastName'
					type='text'
					placeholder='Enter the last name'
					value={formData.lastName}
					onChange={handleChange}
					onBlur={handleBlur}
					className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 ${
						user !== null ? 'bg-slate-300' : ''
					}`}
				></input>
				{touched.lastName && formData.lastName.trim() === '' && (
					<p className='text-red-500 text-xs mt-1'>Last name is required</p>
				)}
			</div>

			<div>
				<label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor='email'>
					Email
				</label>
				<input
					id='email'
					readOnly={user !== null}
					disabled={user !== null}
					name='email'
					type='text'
					placeholder='Enter the email'
					value={formData.email}
					onChange={handleChange}
					onBlur={handleBlur}
					className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 ${
						user !== null ? 'bg-slate-300' : ''
					}`}
				></input>
				{touched.email && formData.email.trim() === '' && <p className='text-red-500 text-xs mt-1'>Email is required</p>}
			</div>

			{!user && (
				<div>
					<label className='block text-gray-700 text-sm font-semibold mb-1' htmlFor='password'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='text'
						placeholder='Enter the password'
						value={formData.password}
						onChange={handleChange}
						onBlur={handleBlur}
						className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 '
					></input>
					{touched.password && formData.password.trim() === '' && (
						<p className='text-red-500 text-xs mt-1'>Password is required</p>
					)}
				</div>
			)}

			<fieldset className='flex flex-col gap-2 mb-2'>
				<legend className='text-gray-700 text-sm font-semibold mb-1'>Role</legend>
				<div className='flex gap-6'>
					<label className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
						<input
							id='roleAdmin'
							readOnly={user !== null}
							// disabled={user !== null}
							type='radio'
							name='role'
							value='ADMIN'
							checked={formData.role === 'ADMIN'}
                            onClick={(e) => { if (user !== null) e.preventDefault(); }}
							onChange={handleChange}
							className='w-4 h-4 bg-white checked:bg-blue-600 checked:border-blue-600'
						/>
						Admin
					</label>
					<label className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
						<input
							id='roleUser'
							readOnly={user !== null}
							// disabled={user !== null}
							type='radio'
							name='role'
							value='USER'
							checked={formData.role === 'USER'}
                            onClick={(e) => { if (user !== null) e.preventDefault(); }}
							onChange={handleChange}
							className='w-4 h-4 checked:bg-blue-600 checked:border-blue-600'
						/>
						User
					</label>
				</div>
			</fieldset>

			{!user && (
				<div className='flex justify-center items-center gap-6 w-full'>
					<button
						type='button'
						className='w-full font-bold py-2 px-4 rounded-lg focus:ring focus:ring-red-300 transition duration-200 bg-red-500 hover:bg-red-600 text-white cursor-pointer'
						onClick={() => navigate('/users/')}
					>
						Cancel
					</button>

					<button
						type='submit'
						disabled={!isValid}
						className={`w-full font-bold py-2 px-4 rounded-lg focus:ring focus:ring-blue-300 transition duration-200 ${
							isValid
								? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
					>
						{params.id && user ? 'Update User' : 'Create User'}
					</button>
				</div>
			)}
		</form>
	);
};

export default UserForm;
