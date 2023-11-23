import { ConfigProvider, Spin, SpinProps } from 'antd'
import React from 'react'

const UiSpin: React.FC<SpinProps> = _props => (
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: '#0766AD',
			},
		}}
	>
		<Spin {..._props} />
	</ConfigProvider>
)

export { UiSpin }
