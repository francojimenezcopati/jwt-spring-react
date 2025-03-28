import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TaskDetails from './pages/TaskDetails';
import { TaskProvider } from './context/TaskContext';

const App: FC = () => {
	return (
		<BrowserRouter>
			<TaskProvider>
				{/* <div className='container w-screen h-screen mx-9 my-5'>
				<div className='w-full h-full flex justify-center items-center'> */}
				<div>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/tasks' element={<TasksPage />} />
						<Route path='/tasks/:id' element={<TaskDetails />} />
						<Route path='/hola' element={<div className='text-red-500 text-4xl'>Hola mundo</div>} />
					</Routes>
				</div>
				{/* </div>
			</div> */}
			</TaskProvider>
		</BrowserRouter>
	);
};

export default App;
