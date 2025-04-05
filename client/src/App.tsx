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
import SignupPage from './pages/SignupPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCreateUser from './pages/AdminCreateUser';
import Footer from './components/Footer';

const App: FC = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<TaskProvider>
					<Toaster richColors/>
					<NavBar />
					<div className='flex justify-center items-center w-full h-full pb-10'>
						<div className='container max-w-[600px] '>
							<Routes>
								<Route path='/login' element={<LoginPage />} />
								<Route path='/signup' element={<SignupPage />} />
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
								<Route
									path='/tasks/create'
									element={
										<PrivateRoute>
											<TaskDetails />
										</PrivateRoute>
									}
								/>
								<Route
									path='/admin/users'
									element={
										<PrivateRoute>
											<AdminUsersPage />
										</PrivateRoute>
									}
								/>
								<Route
									path='/admin/users/create'
									element={
										<PrivateRoute>
											<AdminCreateUser />
										</PrivateRoute>
									}
								/>
								<Route
									path='/admin/users/:id'
									element={
										<PrivateRoute>
											<AdminCreateUser />
										</PrivateRoute>
									}
								/>
							</Routes>
						</div>
					</div>
                    <Footer/>
				</TaskProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
