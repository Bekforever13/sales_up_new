import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuListOrdered } from 'react-icons/lu'
import { NavbarMenu } from './NavbarMenu'
import { UiPopconfirm } from 'src/components/ui'

const Navbar: React.FC = () => {
	const navigate = useNavigate()

	const onConfirm = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	return (
		<nav className='fixed flex flex-col gap-y-5 min-h-screen p-2 z-50 overflow-auto bg-[#ececec] dark:bg-slate-600'>
			<h1
				className='cursor-pointer text-4xl font-bold text-center mt-5 mb-5'
				onClick={() => navigate('/')}
			>
				Sales UP
			</h1>
			<div className='flex flex-col gap-y-[5px]'>
				<NavbarMenu />
				<UiPopconfirm
					title='Вы действительно хотите выйти?'
					onConfirm={onConfirm}
				>
					<div
						className={`flex items-center gap-3 text-xl py-[10px] px-5 rounded-2xl cursor-pointer  hover:bg-black-alpha-10`}
					>
						<LuListOrdered />
						Выйти
					</div>
				</UiPopconfirm>
			</div>
		</nav>
	)
}

export { Navbar }
