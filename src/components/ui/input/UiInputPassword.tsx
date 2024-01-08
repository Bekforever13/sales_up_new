import { ConfigProvider, Input, InputProps } from 'antd'
import React from 'react'
import { useSelectors } from 'src/hooks'

import { useInputMode } from './useInputMode'

const UiInputPassword: React.FC<InputProps> = _props => {
	const { mode } = useSelectors()
	const theme = useInputMode(mode)
	return (
		<ConfigProvider theme={{ token: theme }}>
			<Input.Password allowClear {..._props} />
		</ConfigProvider>
	)
}

export { UiInputPassword }
