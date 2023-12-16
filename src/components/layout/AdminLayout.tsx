import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Navbar } from './navbar/Navbar'
import { axiosInstance } from 'src/services/axiosInstance'

const AdminLayout: React.FC = () => {
	React.useEffect(() => {
		axiosInstance.get('/auth/user')
	}, [])

	return (
		<div className='flex bg-[#fff] dark:bg-slate-700'>
			<Navbar />
			<main className='py-5 pr-5 pl-[220px] w-full flex flex-col gap-y-7 min-h-screen'>
				<Header />
				<Outlet />
			</main>
		</div>
	)
}

export { AdminLayout }
