import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const SignupForm = () => {
	const { handleRegister } = useAuthContext();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
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

		handleRegister({ ...formData });
	};

	return (
		<form className='flex flex-col gap-5' action='post' onSubmit={handleLoginSubmit}>
			<input
				className='appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline'
				type='text'
				name='firstName'
				placeholder='First name'
				value={formData.firstName}
				onChange={handleChange}
			/>
			<input
				className='appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline'
				type='text'
				name='lastName'
				placeholder='Last name'
				value={formData.lastName}
				onChange={handleChange}
			/>
			<input
				className='appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline'
				type='text'
				name='email'
				placeholder='Email'
				value={formData.email}
				onChange={handleChange}
			/>
			<input
				className='appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline'
				type='password'
				name='password'
				placeholder='Password'
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

export default SignupForm;
