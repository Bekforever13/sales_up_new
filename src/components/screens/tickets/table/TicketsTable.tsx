import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TTicketsProps } from './TicketsTable.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { UiButton } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { TTicket } from 'src/store/tickets/Tickets.types'
import { formatPrice } from 'src/utils/shared'
import { Delete } from 'src/components/shared'

const TicketsTable: React.FC<TTicketsProps> = ({ page, setPage }) => {
	const { tickets, ticketsTotal } = useSelectors()
	const { setTicketToEdit, setTicketsDrawer } = useActions()

	const handleChangePage = (event: number) => setPage(event)

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
			render: el => <>{formatPrice(el.toString())} сум</>,
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
						<Delete route='tickets' id={rec.id} />
					</UiButton>
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
