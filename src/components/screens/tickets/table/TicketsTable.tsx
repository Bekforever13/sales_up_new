import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TTicketsProps } from './TicketsTable.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { UiButton, UiPopconfirm } from 'src/components/ui'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions } from 'src/hooks'
import { TTicket } from 'src/store/tickets/Tickets.types'

const TicketsTable: React.FC<TTicketsProps> = ({ page, setPage }) => {
	const { tickets, ticketsTotal } = useSelectors()
	const { setFetch, setTicketToEdit, setTicketsDrawer } = useActions()

	const handleChangePage = (event: number) => setPage(event)

	const handleDelete = (id: number) => {
		axiosInstance.delete(`/tickets/${id}`).then(() => setFetch(Math.random()))
	}

	const handleEdit = (rec: TTicket) => {
		setTicketToEdit({
			id: rec.id,
			name: rec.name,
			price: rec.price,
		})
		setTicketsDrawer(true)
	}

	const columns: ColumnsType<TTicket> = [
		{
			title: 'Название',
			dataIndex: 'name',
		},
		{
			title: 'Цена',
			dataIndex: 'price',
			render: el => <>{el.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} сум</>,
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
			dataSource={tickets}
			pagination={{
				total: ticketsTotal,
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

export { TicketsTable }
