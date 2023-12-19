import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { TTelegramLead, TTelegramLeadsProps } from './TelegramLeadsTable.types'

const TelegramLeadsTable: React.FC<TTelegramLeadsProps> = ({
	page,
	setPage,
}) => {
	const { telegraphLeads, telegraphLeadsTotal } = useSelectors()

	const handleChangePage = (event: number) => setPage(event)

	const columns: ColumnsType<TTelegramLead> = [
		{
			title: 'Имя',
			dataIndex: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
		},
		{
			title: 'Адресс',
			dataIndex: 'link',
		},
	]

	return (
		<UiTable
			columns={columns}
			dataSource={telegraphLeads}
			pagination={{
				total: telegraphLeadsTotal,
				current: page,
				showSizeChanger: false,
				defaultPageSize: 10,
				onChange: handleChangePage,
			}}
			rowKey={e => e.id}
			scroll={{ x: true }}
			size='small'
			bordered
		/>
	)
}

export { TelegramLeadsTable }
