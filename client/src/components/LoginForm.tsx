// import { FormEventHandler, useContext } from 'react';
// import AuthContext from '../context/AuthContext';

import { useState } from 'react';

const LoginForm = () => {
	// const {handleLogin} = useContext(AuthContext)

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
		console.log(formData); // Datos del formulario
		// handleLogin(formData.email, formData.password);
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
		</form>
	);
};

export default LoginForm;
