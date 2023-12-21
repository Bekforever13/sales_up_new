import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { UiButton } from 'src/components/ui'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { LeadTicketForm, LeadTicketProps } from './LeadTicketModalTypes'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TTicket } from 'src/store/tickets/Tickets.types'

const LeadTicketModal: React.FC<LeadTicketProps> = ({
	lead,
	modal,
	setModal,
}) => {
	const { setTickets, setTicketsTotal, setFetch } = useActions()
	const { fetch, tickets } = useSelectors()
	const [newData, setNewData] = useState<LeadTicketForm[]>([])

	const handleCancel = () => {
		setModal(false)
	}

	const handleDecrement = (id: number) => {
		const updatedData = newData.map(item => {
			if (item.id === id) {
				return {
					id: id,
					quantity: item.quantity - 1,
				}
			}
			return item
		})
		setNewData(updatedData)
	}

	const handleIncrement = (id: number) => {
		const updatedData = newData.map(item => {
			if (item.id === id) {
				return {
					id: id,
					quantity: item.quantity + 1,
				}
			}
			return item
		})
		setNewData(updatedData)
	}

	const handleSubmit = () => {
		axiosInstance
			.post(`/leads/${lead?.id}/tickets`, { tickets: newData })
			.then(() => {
				setModal(false)
				setFetch(Math.random())
				setNewData([])
			})
	}

	useEffect(() => {
		if (modal) {
			axiosInstance.get('/tickets').then(res => {
				setTicketsTotal(res.data.total)
				setTickets(res.data.data)
				res.data.data.map((ticket: TTicket) => {
					setNewData(prev => [
						...prev,
						{
							id: ticket.id,
							quantity:
								lead?.tickets?.find(el => el.id === ticket.id)?.quantity ?? 0,
						},
					])
				})
			})
		}
		if (!modal) {
			setNewData([])
		}
	}, [fetch, modal])

	return (
		<Modal
			title={`Билет лида: ${lead?.first_name.concat(' ' + lead.last_name)}`}
			open={modal}
			onCancel={handleCancel}
			footer={false}
		>
			{tickets?.map(ticket => {
				return (
					<div
						key={ticket.id}
						className='flex items-center justify-between w-full my-5'
					>
						<div className='text-black dark:text-black'>{ticket.name}</div>
						<div className='text-black dark:text-black'>
							{ticket.price.toString().replace(/\d{3}(?=\d)/g, '$&\n')}
						</div>
						<div className='flex items-center gap-5'>
							<UiButton
								disabled={
									newData.find(item => item.id === ticket.id)?.quantity === 0
								}
								onClick={() => handleDecrement(ticket.id)}
								className='flex items-center'
							>
								<FaMinus size='18' />
							</UiButton>
							<div className='w-16 bg-blue-600 p-1 rounded-lg flex items-center justify-center select-none'>
								{newData?.find(item => item.id === ticket.id)?.quantity}
							</div>
							<UiButton
								onClick={() => handleIncrement(ticket.id)}
								className='flex items-center'
							>
								<FaPlus size='18' />
							</UiButton>
						</div>
					</div>
				)
			})}
			<UiButton onClick={handleSubmit}>Сохранить</UiButton>
		</Modal>
	)
}

export { LeadTicketModal }
