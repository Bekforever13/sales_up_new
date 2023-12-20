import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { TTelegramLead, TTelegramLeadsProps } from './TelegramLeadsTable.types'
import { MdOutlineTextsms } from 'react-icons/md'
import { TelegramChat } from '../chat/TelegramChat'
import { useActions } from 'src/hooks'
import { UiButton } from 'src/components/ui'

const TelegramLeadsTable: React.FC<TTelegramLeadsProps> = ({
	page,
	setPage,
}) => {
	const { telegraphLeads, telegraphLeadsTotal } = useSelectors()
	const { setTelegramChatID, setTelegramChatDrawer } = useActions()

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
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, rec) => (
				<UiButton className='cursor-pointer'>
					<MdOutlineTextsms
						size='22'
						onClick={() => {
							setTelegramChatID(rec.id)
							setTelegramChatDrawer(true)
						}}
					/>
				</UiButton>
			),
		},
	]

	return (
		<>
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
			<TelegramChat />
		</>
	)
}

export { TelegramLeadsTable }
