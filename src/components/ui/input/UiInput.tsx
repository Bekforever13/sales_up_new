import { ConfigProvider, Input, InputProps } from 'antd'
import React from 'react'
import { useSelectors } from 'src/hooks'
import { CloseCircleTwoTone } from '@ant-design/icons'

import { useInputMode } from './useInputMode'

const UiInput: React.FC<InputProps> = _props => {
	const { mode } = useSelectors()
	const theme = useInputMode(mode)
	return (
		<ConfigProvider theme={{ token: theme }}>
			<Input
				allowClear={{
					clearIcon: (
						<CloseCircleTwoTone className={mode === 'dark' ? '#fff text-base' : '#000 text-base'} />
					),
				}}
				{..._props}
			/>
		</ConfigProvider>
	)
}

export { UiInput }
