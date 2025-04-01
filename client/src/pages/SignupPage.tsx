import SignupForm from '../components/SignupForm';

const SignupPage = () => {
	return (
		<div className='h-[calc(100vh-140px)] flex flex-col justify-center items-center bg-gray-100 mt-4'>
			<div className='w-full max-w-md p-8 bg-white rounded-xl shadow-lg'>
				<h1 className='text-4xl font-semibold text-gray-800 text-center'>Sign up</h1>
				<h2 className='text-lg text-gray-600 my-4 text-center'>Sign up to start using the app</h2>
				<SignupForm />
			</div>
		</div>
	);
};

export default SignupPage;
