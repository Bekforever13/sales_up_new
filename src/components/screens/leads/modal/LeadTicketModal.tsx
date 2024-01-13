import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { UiButton } from 'src/components/ui'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { LeadTicketForm, LeadTicketProps } from './LeadTicketModalTypes'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TTicket } from 'src/store/tickets/Tickets.types'
import { formatPrice } from 'src/utils/shared'

const LeadTicketModal: React.FC<LeadTicketProps> = ({
	lead,
	modal,
	setModal,
}) => {
	const { setTickets, setFetch } = useActions()
	const { tickets } = useSelectors()
	const [newData, setNewData] = useState<LeadTicketForm[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const handleCancel = () => setModal(false)

	const handleDecrement = (id: number) => {
		// decrement quantity of ticket to -1
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
		// increment quantity of ticket to +1
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
		setIsLoading(true)
		axiosInstance
			.post(`/leads/${lead?.id}/tickets`, { tickets: newData })
			.then(() => {
				// close modal, change fetch to refetch all tables, clear state
				setFetch(Math.random())
				setIsLoading(false)
				setModal(false)
				setNewData([])
			})
	}

	useEffect(() => {
		// if modal open we get tickets
		if (lead) {
			axiosInstance.get('/tickets').then(res => {
				setTickets(res.data.data)
				res.data.data.map((ticket: TTicket) => {
					setNewData(prev => [
						...prev,
						{
							id: ticket.id,
							quantity:
								lead?.tickets?.find(el => el.id === ticket.id)?.quantity || 0,
						},
					])
				})
			})
		}
	}, [lead])

	useEffect(() => {
		if (!modal) {
			setNewData([])
		}
	}, [modal, lead?.id])

	return (
		<Modal
			title={`Билет лида: ${lead?.first_name.concat(' ' + lead.last_name)}`}
			open={modal}
			onCancel={handleCancel}
			footer={false}
		>
			{/* mapping all tickets */}
			<div className='max-h-[500px] overflow-y-auto pr-5'>
				{tickets?.map(ticket => {
					return (
						<div
							key={ticket.id}
							className='flex items-center w-full my-5'
						>
							{/* name of ticket */}
							<div className='text-black dark:text-black'>{ticket.name}</div>
							{/* price of ticket */}
							<div className='text-black dark:text-black ml-auto mr-5'>
								{formatPrice(ticket.price)}
							</div>
							{/* tickets actions */}
							<div className='flex items-center gap-5 '>
								<UiButton
									disabled={
										newData.find(item => item.id === ticket.id)?.quantity === 0
									}
									onClick={() => handleDecrement(ticket.id)}
									className='flex items-center'
								>
									<FaMinus size='18' />
								</UiButton>
								<div className='w-16 bg-blue-600 p-1 rounded-lg flex items-center justify-center select-none text-white dark:text-white'>
									{/* this will display lead's quantity of ticket */}
									{newData?.find(item => item.id === ticket.id)?.quantity ?? 0}
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
			</div>
			<div className='flex justify-end pr-10 pt-3'>
				<UiButton loading={isLoading} onClick={handleSubmit}>
					Сохранить
				</UiButton>
			</div>
		</Modal>
	)
}

export { LeadTicketModal }
