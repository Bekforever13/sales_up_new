import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, ConfigProvider } from 'antd'
import { capatilize } from 'src/utils/capitalize'
import { useSelectors } from 'src/hooks'
import { useBreadcrumbMode } from './useBreadcrumbMode'

const UiBreadCrumbs: React.FC = () => {
	const location = useLocation()
	const { mode } = useSelectors()
	const theme = useBreadcrumbMode(mode)
	const breadCrumbView = () => {
		const { pathname } = location
		const pathnames = pathname.split('/').filter(item => item)

		return (
			<ConfigProvider theme={{ token: theme }}>
				<Breadcrumb
					items={[
						{
							title: <Link to='/'>Главная</Link>,
						},
						...pathnames.map((name, index) => {
							const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
							const kiril = () => {
								switch (capatilize(name)) {
									case 'Companies':
										return 'Компании'
									case 'Leads':
										return 'Лиды'
									case 'Tickets':
										return 'Билеты'
									case 'Telegram_leads':
										return 'Телеграм лиды	'
									case 'Courses':
										return 'Курсы'
									case 'Sources':
										return 'Источники'
									case 'Users':
										return 'Пользователи'
									default:
										return capatilize(name)
								}
							}
							return {
								title: <Link to={routeTo}>{kiril()}</Link>,
							}
						}),
					]}
				/>
			</ConfigProvider>
		)
	}

	return <>{breadCrumbView()}</>
}

export { UiBreadCrumbs }
