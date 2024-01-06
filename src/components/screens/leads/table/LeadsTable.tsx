import React, { useState } from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { TLeadsProps } from './LeadsTable.types'
import { TLeadsTable, TLeadsForm } from 'src/store/leads/Leads.types'
import type { ColumnsType } from 'antd/es/table'
import UiTable from 'src/components/ui/table/UiTable'
import { BsPencilSquare } from 'react-icons/bs'
import { UiButton } from 'src/components/ui'
import { Delete } from 'src/components/shared'
import { useActions } from 'src/hooks'
import { IoTicketOutline } from 'react-icons/io5'
import { LeadTicketModal } from '../modal/LeadTicketModal'
import { MdOutlineTextsms } from 'react-icons/md'
import { TelegramChat } from '../chat/TelegramChat'
import { formatPhone } from 'src/utils/shared'

const LeadsTable: React.FC<TLeadsProps> = ({ page, setPage }) => {
	const [currentLead, setCurrentLead] = useState<TLeadsTable>()
	const [modal, setModal] = useState(false)
	const { leads, leadsTotal } = useSelectors()
	const {
		setLeadsDrawer,
		setLeadsToEdit,
		setTelegramChatDrawer,
		setTelegramChatID,
	} = useActions()

	const handleChangePage = (event: number) => setPage(event)

	const handleEdit = (rec: TLeadsForm) => {
		setLeadsDrawer(true)
		setLeadsToEdit(rec)
	}

	const columns: ColumnsType<TLeadsTable> = [
		{
			title: 'Имя',
			dataIndex: 'first_name',
		},
		{
			title: 'Фамилия',
			dataIndex: 'last_name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			width: 150,
			render: (_, rec) => formatPhone(rec.phone ?? ''),
		},
		{
			title: 'Билеты',
			dataIndex: 'tickets',
			render: (_, rec) => (
				<ul>
					{rec.tickets.map(el => (
						<li className='flex items-center gap-5' key={el.id}>
							{el.name}:<span>{el.quantity} шт</span>
						</li>
					))}
				</ul>
			),
		},
		{
			title: 'Комментарий',
			dataIndex: 'comment',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, rec) => (
				<div className='flex items-center gap-2'>
					<UiButton
						onClick={() =>
							handleEdit({
								first_name: rec.first_name,
								last_name: rec.last_name,
								phone: rec.phone!,
								id: rec.id,
								comment: rec.comment!,
							})
						}
					>
						<BsPencilSquare size='22' />
					</UiButton>
					<UiButton>
						<Delete route='leads' id={rec.id} />
					</UiButton>
					<UiButton
						onClick={() => {
							setCurrentLead(rec)
							setModal(true)
						}}
					>
						<IoTicketOutline size='22' />
					</UiButton>
					<UiButton className='cursor-pointer'>
						<MdOutlineTextsms
							size='22'
							onClick={() => {
								setTelegramChatID(rec.telegraph_chat_id)
								setTelegramChatDrawer(true)
							}}
						/>
					</UiButton>
				</div>
			),
		},
	]

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={leads}
				pagination={{
					total: leadsTotal,
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
			<LeadTicketModal
				modal={modal}
				setModal={setModal}
				lead={currentLead ?? null}
			/>
			<TelegramChat />
		</>
	)
}

export { LeadsTable }
