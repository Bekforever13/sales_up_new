import React, { useEffect, useState } from 'react'
import moment from 'moment/moment.js'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { MdDeleteOutline } from 'react-icons/md'
import { UiButton, UiPopconfirm } from 'src/components/ui'

const Bot: React.FC = () => {
	const [render, setRender] = useState(0)
	const [formattedDate, setFormattedDate] = useState('')
	const { bot } = useSelectors()
	const { removeBot } = useActions()

	useEffect(() => {
		bot
			? setFormattedDate(moment(bot.date).format('DD/MM/YYYY, h:mm:ss'))
			: setFormattedDate('')
	}, [])

	const deleteBot = () => {
		axiosInstance.delete(`/bots/${bot?.id}`).then(() => {
			removeBot()
			setRender(render + 1)
		})
	}

	return (
		<div className='flex-1 flex flex-col bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[200px] p-5'>
			{bot ? (
				<table className='flex flex-col gap-y-5 py-3'>
					<thead className='border-b-[1px] border-[#adadad] text-2xl'>
						<tr>
							<th className='font-normal'>Бот</th>
						</tr>
					</thead>
					<tbody>
						<tr className='flex justify-start items-start mb-5'>
							<td className='flex-1'>BOT</td>
							<td className='flex-1 text-right'>{bot.username}</td>
						</tr>
						<tr className='flex justify-start items-start mb-5'>
							<td className='flex-1'>ID</td>
							<td className='flex-1 text-right'>{bot.id}</td>
						</tr>
						<tr className='flex  justify-start items-start mb-5'>
							<td className='flex-1'>Contact</td>
							<td className='flex-1 text-right'>{bot.contact}</td>
						</tr>
						<tr className='flex justify-start items-start mb-5'>
							<td className='flex-1'>Created</td>
							<td className='flex-1 text-right'>{formattedDate}</td>
						</tr>
						<tr>
							<td>
								<UiPopconfirm
									onConfirm={deleteBot}
									title='Удаление'
									description='Вы хотите удалить бота?'
								>
									<UiButton>
										<MdDeleteOutline size='22' color='red' />
									</UiButton>
								</UiPopconfirm>
							</td>
						</tr>
					</tbody>
				</table>
			) : (
				''
			)}
		</div>
	)
}

export { Bot }
