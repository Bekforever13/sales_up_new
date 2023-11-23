import { Button, ButtonProps, ConfigProvider } from 'antd'
import React from 'react'

const UiButton: React.FC<ButtonProps> = _props => (
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: '#1677FF',
			},
		}}
	>
		<Button type='primary' {..._props} />
	</ConfigProvider>
)

export { UiButton }
