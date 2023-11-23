import { Checkbox, CheckboxProps, ConfigProvider } from 'antd'
import React from 'react'

const UiCheckbox: React.FC<CheckboxProps> = _props => (
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: '#0766AD',
			},
		}}
	>
		<Checkbox {..._props} />
	</ConfigProvider>
)

export { UiCheckbox }
