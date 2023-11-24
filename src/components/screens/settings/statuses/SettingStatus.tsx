import { Space, message } from 'antd'
import React, { useState } from 'react'
import { UiButton, UiInput, UiPopconfirm } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { MdDeleteOutline } from 'react-icons/md'
import { EditStatus } from './EditStatus'

const SettingStatus: React.FC = () => {
	const [newStatus, setNewStatus] = useState({ name: '' })
	const { statuses } = useSelectors()
	const { fetch } = useActions()

	const createStatus = () => {
		axiosInstance.post('/statuses', newStatus).then(() => {
			setNewStatus({ name: '' })
			fetch(Math.random())
		})
	}

	const deleteStatus = (id: string) => {
		axiosInstance.delete(`/statuses/${id}`).then(() => {
			fetch(Math.random())
			message.success('Удалено')
		})
	}

	return (
		<div className='flex-1 flex flex-col bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[200px] p-5'>
			<h2 className='text-2xl mb-5'>Статус</h2>
			<form className='flex flex-col gap-y-5'>
				<Space.Compact style={{ width: '100%' }}>
					<UiInput
						onChange={e => setNewStatus({ name: e.target.value })}
						value={newStatus.name}
						placeholder='Статус'
						className='py-2 text-lg'
					/>
					<UiButton
						onClick={createStatus}
						className='bg-[#1976D2] py-2 text-lg h-fit'
					>
						Submit
					</UiButton>
				</Space.Compact>
				<ul className='flex flex-col gap-y-5'>
					{statuses.map(status => (
						<li
							key={status.id}
							className='flex items-center justify-between text-base'
						>
							<span>{status.name}</span>
							{status.name === 'started' ||
							status.name === 'registred' ||
							status.name === 'ordered' ||
							status.name === 'called' ? null : (
								<div className='flex items-center gap-x-5'>
									<EditStatus status={status} />
									<UiPopconfirm
										title='Вы хотите удалить статус?'
										onConfirm={() => deleteStatus(status.id)}
									>
										<UiButton>
											<MdDeleteOutline size='22' />
										</UiButton>
									</UiPopconfirm>
								</div>
							)}
						</li>
					))}
				</ul>
			</form>
		</div>
	)
}

export { SettingStatus }
