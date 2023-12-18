import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TLeadsProps } from './UsersTable.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { UiButton, UiPopconfirm } from 'src/components/ui'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions } from 'src/hooks'
import { TUser } from 'src/store/users/Users.types'

const UsersTable: React.FC<TLeadsProps> = ({ page, setPage }) => {
	const { users, usersTotal } = useSelectors()
	const { setFetch, setUserToEdit, setUserDrawer } = useActions()

	const handleChangePage = (event: number) => setPage(event)

	const handleDelete = (id: number) => {
		axiosInstance
			.delete(`/admin/users/${id}`)
			.then(() => setFetch(Math.random()))
	}

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
			render: (_, rec) => (
				<div className='flex items-center gap-2'>
					<UiButton onClick={() => handleEdit(rec)}>
						<BsPencilSquare size='22' className='cursor-pointer' />
					</UiButton>
					<UiPopconfirm
						title='Вы действительно хотите удалить?'
						onConfirm={() => handleDelete(rec.id)}
					>
						<UiButton>
							<IoTrashOutline size='22' className='cursor-pointer' />
						</UiButton>
					</UiPopconfirm>
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
