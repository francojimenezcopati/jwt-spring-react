import LoginForm from '../components/LoginForm';

const LoginPage = () => {
	return (
        <div className='flex'>

		<div className="h-[calc(100vh-140px)] flex-1 flex flex-col justify-center items-center bg-gray-100 mt-4">
			<div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
				<h1 className="text-4xl font-semibold text-gray-800 text-center">
					Login
				</h1>
                <h2 className='text-lg text-gray-600 my-4 text-center'>
                    Login to access the app
                </h2>
				<LoginForm />
			</div>
		</div>

        {/* <div className='translate-y-32'>
            <span>Fast access:</span>
            <div className='w-20 h-20 bg-red-500'>

            </div>
        </div> */}
        </div>
	);
};

export default LoginPage;
