import { ConfigProvider, DatePicker, TimeRangePickerProps } from 'antd'
import React from 'react'
import { useSelectors } from 'src/hooks'

import { useDataPickerMode } from './useDataPickerMode'

const UiDataPicker: React.FC<TimeRangePickerProps> = _props => {
	const { mode } = useSelectors()
	const theme = useDataPickerMode(mode)
	return (
		<ConfigProvider theme={{ components: { DatePicker: theme } }}>
			<DatePicker.RangePicker {..._props} style={{ width: '100%' }} />
		</ConfigProvider>
	)
}

export { UiDataPicker }
