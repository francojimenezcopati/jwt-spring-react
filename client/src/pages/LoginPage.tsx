import LoginForm from '../components/LoginForm';

const LoginPage = () => {
	return (
		<div className="h-[calc(100vh-140px)] flex flex-col justify-center items-center bg-gray-100 mt-4">
			<div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
				<h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
					Login to access the app
				</h1>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
