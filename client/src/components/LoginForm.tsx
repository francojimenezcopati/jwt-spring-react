import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const LoginForm = () => {
	const { handleLogin } = useAuthContext();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value, // Actualiza solo el campo modificado
		});
	};

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// console.log(formData); // Datos del formulario
		handleLogin({ email: formData.email, password: formData.password });
	};
    
	const handleFastAccess = (role: 'USER' | 'ADMIN') => {
		if (role === 'USER') {
			setFormData({
				email: 'user@mail.com',
				password: 'user123',
			});
		} else {
			setFormData({
				email: 'admin@mail.com',
				password: 'admin123',
			});
		}
	};

	return (
		<form className='flex flex-col gap-5' action='post' onSubmit={handleLoginSubmit}>
			<input
				className='appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline'
				type='text'
				name='email'
				placeholder='Enter your email'
				value={formData.email}
				onChange={handleChange}
			/>
			<input
				className='appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline'
				type='password'
				name='password'
				placeholder='Enter your password'
				value={formData.password}
				onChange={handleChange}
			/>
			<input
				type='submit'
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
			/>

			<div className='flex w-full justify-center items-center gap-5 mt-4'>
				<button
					onClick={() => handleFastAccess('USER')}
					type='button'
					className='bg-[#6C3FEE] hover:bg-[#4412D4] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
				>
					User
				</button>
				<button
					onClick={() => handleFastAccess('ADMIN')}
					type='button'
					className='bg-[#6C3FEE] hover:bg-[#4412D4] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
				>
					Admin
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
