import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Auth } from 'src/components/screens'
import { routes } from 'src/routes/Routes'
import { AdminLayout } from 'src/components/layout/AdminLayout'
import { useSelectors } from './hooks/useSelectors'

const App: React.FC = () => {
	const { isAuth } = useSelectors()
	const navigate = useNavigate()
	const theme = localStorage.getItem('theme')
	const { pathname } = useLocation()

	React.useEffect(() => {
		if (!isAuth) navigate('/auth', { replace: true })
	}, [pathname, isAuth])
	return (
		<div className={`app ${theme}`}>
			<Routes>
				<Route path='/auth' element={<Auth />} />
				{isAuth && (
					<Route path='/' element={<AdminLayout />}>
						{routes.map(item => (
							<Route key={item.path} path={item.path} element={item.element} />
						))}
					</Route>
				)}
			</Routes>
		</div>
	)
}

export { App }
