import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSolidContact } from 'react-icons/bi'
import { MdViewCompact } from 'react-icons/md'
import { SlNotebook } from 'react-icons/sl'
import { DiOpensource } from 'react-icons/di'
import { RiAdminLine } from 'react-icons/ri'
import { useSelectors } from 'src/hooks'
import { FaRegCircleUser } from 'react-icons/fa6'
import { IoTicketOutline } from 'react-icons/io5'

const NavbarMenu: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { currentRoleId } = useSelectors()

	const menuItems = [
		{ pathname: '/', icon: <AiOutlineHome />, label: 'Главная' },
		{ pathname: '/companies', icon: <MdViewCompact />, label: 'Компании' },
		{ pathname: '/leads', icon: <BiSolidContact />, label: 'Лиды' },
		{ pathname: '/tickets', icon: <IoTicketOutline />, label: 'Билеты' },
		{
			pathname: '/telegram_leads',
			icon: <FaRegCircleUser />,
			label: 'Телеграм-Лиды',
		},
		{ pathname: '/courses', icon: <SlNotebook />, label: 'Курсы' },
		{ pathname: '/sources', icon: <DiOpensource />, label: 'Источники' },
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
							pathname === item.pathname &&
							'bg-[#d3d3d3] dark:bg-black-alpha-20'
						}`}
					>
						{item.icon}
						{item.label}
					</div>
				)
			})}
			{currentRoleId === 1 && (
				<div
					onClick={() => handleClickRoute('/users')}
					key='/users'
					className={`flex items-center gap-3 py-[10px] px-5 rounded-2xl cursor-pointer hover:bg-[#d9d9d9] dark:hover:bg-black-alpha-10 ${
						pathname === '/users' && 'bg-[#d3d3d3] dark:bg-black-alpha-20'
					}`}
				>
					<RiAdminLine />
					Пользователи
				</div>
			)}
		</>
	)
}

export { NavbarMenu }
