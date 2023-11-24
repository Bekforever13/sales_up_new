import React from 'react'
import UiTable from 'src/components/ui/table/UiTable'
import { useSelectors } from 'src/hooks'
import type { ColumnsType } from 'antd/es/table'
import { TTool } from 'src/store/tools/Tools.type'
import { FaRegCopy } from 'react-icons/fa'
import { UiButton } from 'src/components/ui'
import { message } from 'antd'

type TCoursesProps = {
	page: any
	setPage: (page: React.SetStateAction<number>) => void
}

const ToolsTable: React.FC<TCoursesProps> = ({ page, setPage }) => {
	const { tools, toolsTotal } = useSelectors()

	const copy = (rec: TTool) => {
		navigator.clipboard.writeText(rec.url)
		message.success('Скопировано в буфер')
	}

	const columns: ColumnsType<TTool> = [
		{
			title: 'Источники',
			dataIndex: 'source_name',
		},
		{
			title: 'Ссылка',
			dataIndex: 'url',
		},
		{
			title: 'Кликнул',
			dataIndex: 'clicked',
		},
		{
			title: 'Цена',
			dataIndex: 'sum',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, rec) => (
				<UiButton onClick={() => copy(rec)}>
					<FaRegCopy />
				</UiButton>
			),
		},
	]
	return (
		<UiTable
			columns={columns}
			dataSource={tools}
			pagination={{
				total: toolsTotal,
				current: page,
				showSizeChanger: false,
				defaultPageSize: 10,
				onChange: e => setPage(e),
			}}
			rowKey={e => e.id}
			size='small'
			bordered
		/>
	)
}

export { ToolsTable }
