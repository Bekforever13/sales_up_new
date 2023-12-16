import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TLeadsProps } from './UsersTable.types'
import { TLeads } from 'src/store/leads/Leads.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { UiButton } from 'src/components/ui'

const UsersTable: React.FC<TLeadsProps> = ({ page, setPage }) => {
	const { users, usersTotal } = useSelectors()

	const handleChangePage = (event: number) => setPage(event)

	const columns: ColumnsType<TLeads> = [
		{
			title: 'ФИО',
			dataIndex: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
		},
		{
			title: 'Роль',
			dataIndex: 'role_name',
		},
		{
			title: 'Компания',
			dataIndex: 'default_company_id',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: () => (
				<div className='flex items-center gap-2'>
					<UiButton>
						<BsPencilSquare size='22' className='cursor-pointer' />
					</UiButton>
					<UiButton>
						<IoTrashOutline size='22' className='cursor-pointer' />
					</UiButton>
				</div>
			),
		},
	]

	return (
		<UiTable
			columns={columns}
			dataSource={users}
			pagination={{
				total: usersTotal,
				current: page,
				showSizeChanger: false,
				defaultPageSize: 10,
				onChange: handleChangePage,
			}}
			scroll={{ x: true }}
			rowKey={e => e.id}
			size='small'
			bordered
		/>
	)
}

export { UsersTable }
