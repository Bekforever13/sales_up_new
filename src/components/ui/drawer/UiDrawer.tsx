import { ConfigProvider, Drawer, DrawerProps } from 'antd'
import React from 'react'
import { useSelectors } from 'src/hooks'
import { useDrawerMode } from './useDrawerMode'

const UiDrawer: React.FC<DrawerProps> = props => {
	const { mode } = useSelectors()
	const theme = useDrawerMode(mode)
	return (
		<ConfigProvider theme={{ token: theme }}>
			<Drawer {...props} />
		</ConfigProvider>
	)
}

export { UiDrawer }
