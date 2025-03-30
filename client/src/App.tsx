import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TaskDetails from './pages/TaskDetails';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';
import { Toaster } from 'sonner';

const App: FC = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<TaskProvider>
					<Toaster richColors/>
					<NavBar />
					<div className='flex justify-center items-center w-full h-full'>
						<div className='container max-w-[600px] '>
							<Routes>
								<Route path='/login' element={<LoginPage />} />
								<Route path='/' element={<Navigate to='/tasks' />} />
								<Route
									path='/tasks'
									element={
										<PrivateRoute>
											<TasksPage />
										</PrivateRoute>
									}
								/>
								<Route
									path='/tasks/:id'
									element={
										<PrivateRoute>
											<TaskDetails />
										</PrivateRoute>
									}
								/>
							</Routes>
						</div>
					</div>
				</TaskProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
