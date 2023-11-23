import { ConfigProvider, Table, TableProps } from 'antd'
import React from 'react'
import { useSelectors } from 'src/hooks'
import { useTableMode } from './useTableMode'

const UiTable: React.FC<TableProps<any>> = props => {
	const { mode } = useSelectors()
	const theme = useTableMode(mode)
	return (
		<ConfigProvider theme={{ token: theme }}>
			<Table {...props} />
		</ConfigProvider>
	)
}

export default UiTable
