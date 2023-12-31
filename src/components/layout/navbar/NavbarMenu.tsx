import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiFillSetting } from 'react-icons/ai'
import { BsTools, BsCartCheck } from 'react-icons/bs'
import { BiSolidContact } from 'react-icons/bi'
import { SlNotebook } from 'react-icons/sl'
import { DiOpensource } from 'react-icons/di'

const NavbarMenu: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const menuItems = [
		{ pathname: '/', icon: <AiOutlineHome />, label: 'Главная' },
		{ pathname: '/leads', icon: <BiSolidContact />, label: 'Лиды' },
		{ pathname: '/orders', icon: <BsCartCheck />, label: 'Заказы' },
		{ pathname: '/courses', icon: <SlNotebook />, label: 'Курсы' },
		{ pathname: '/sources', icon: <DiOpensource />, label: 'Источники' },
		{ pathname: '/tools', icon: <BsTools />, label: 'Инструменты' },
		{ pathname: '/settings', icon: <AiFillSetting />, label: 'Настройки' },
	]

	const handleClickRoute = (pathname: string) => {
		navigate(pathname, { replace: true })
	}
	return (
		<>
			{menuItems.map(item => {
				return (
					<div
						onClick={() => handleClickRoute(item.pathname)}
						key={item.pathname}
						className={`flex items-center gap-3 py-[10px] px-5 rounded-2xl cursor-pointer hover:bg-[#d9d9d9] dark:hover:bg-black-alpha-10 ${
							pathname === item.pathname && 'bg-[#d3d3d3] dark:bg-black-alpha-20'
						}`}
					>
						{item.icon}
						{item.label}
					</div>
				)
			})}
		</>
	)
}

export { NavbarMenu }
