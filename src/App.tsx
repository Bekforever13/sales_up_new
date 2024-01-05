import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Auth } from 'src/components/screens'
import { routes } from 'src/routes/Routes'
import { AdminLayout } from 'src/components/layout/AdminLayout'
import { axiosInstance } from './services/axiosInstance'

const App: React.FC = () => {
	const navigate = useNavigate()
	const theme = localStorage.getItem('theme')
	const token = localStorage.getItem('token')

	React.useEffect(() => {
		if (!token) {
			navigate('/auth')
		}
		if (token) {
			axiosInstance.get('/auth/user').catch(() => navigate('/auth'))
		}
	}, [token])

	return (
		<div className={`app ${theme}`}>
			<Routes>
				<Route path='/auth' element={<Auth />} />
				<Route path='/' element={<AdminLayout />}>
					{routes.map(item => (
						<Route key={item.path} path={item.path} element={item.element} />
					))}
				</Route>
			</Routes>
		</div>
	)
}

export { App }
