import LoginForm from '../components/LoginForm';

const LoginPage = () => {
	return (
		<div className='flex flex-col justify-center items-center gap-6 rounded-3xl bg-slate-300 p-9'>
			<h1 className='text-2xl text-gray-900'>Login to access the app</h1>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
