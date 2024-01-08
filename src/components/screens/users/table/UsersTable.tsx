import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TLeadsProps } from './UsersTable.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { UiButton } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { TUser } from 'src/store/users/Users.types'
import { Delete } from 'src/components/shared'
import { formatPhone } from 'src/utils/shared'

const UsersTable: React.FC<TLeadsProps> = ({ page, setPage }) => {
	const { users, usersTotal } = useSelectors()
	const { setUserToEdit, setUserDrawer } = useActions()

	const handleChangePage = (event: number) => setPage(event)

	const handleEdit = (rec: TUser) => {
		setUserToEdit({
			id: rec.id,
			name: rec.name,
			phone: rec.phone,
			role_id: rec.role_id,
			password: '',
		})
		setUserDrawer(true)
	}

	const columns: ColumnsType<TUser> = [
		{
			title: 'Ф.И.О',
			dataIndex: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			render: (_, rec) => formatPhone(rec.phone),
		},
		{
			title: 'Роль',
			dataIndex: 'role_name',
			render: (_, rec) => (rec.role_name === 'user' ? 'Пользователь' : 'Админ'),
		},
		{
			title: 'Компания',
			dataIndex: 'default_company_id',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, rec) => (
				<div className='flex items-center gap-2'>
					<UiButton onClick={() => handleEdit(rec)}>
						<BsPencilSquare size='22' className='cursor-pointer' />
					</UiButton>
					<UiButton>
						<Delete route='admin/users' id={rec.id} />
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
