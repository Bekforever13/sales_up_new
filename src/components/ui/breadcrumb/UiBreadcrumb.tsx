import React from 'react'
import { useLocation, Link } from 'react-router-dom'
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
				<Breadcrumb>
					{pathnames.length > 0 ? (
						<Breadcrumb.Item>
							<Link to='/'>Главная</Link>
						</Breadcrumb.Item>
					) : (
						<Breadcrumb.Item>Главная</Breadcrumb.Item>
					)}
					{pathnames.map((name, index) => {
						const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
						const isLast = index === pathnames.length - 1
						return isLast ? (
							<Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
						) : (
							<Breadcrumb.Item key={index}>
								<Link to={`${routeTo}`}>{capatilize(name)}</Link>
							</Breadcrumb.Item>
						)
					})}
				</Breadcrumb>
			</ConfigProvider>
		)
	}

	return <>{breadCrumbView()}</>
}

export { UiBreadCrumbs }
