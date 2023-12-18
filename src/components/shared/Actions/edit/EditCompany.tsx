import React, { useState, useEffect } from 'react'
import { Popover } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiButton, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'

const EditCompany: React.FC = () => {
	const [open, setOpen] = useState(false)
	const { setFetch } = useActions()
	const { companiesEdit } = useSelectors()
	const [newCompany, setNewCompany] = useState({
		title: '',
		description: '',
		telegram_channel: '',
	})

	const onEditSubmit = () => {
		const obj = { id: companiesEdit?.id, ...newCompany }
		axiosInstance.put(`/companies/${companiesEdit?.id}`, obj).then(() => {
			setFetch(Math.random())
			setOpen(false)
		})
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Название'
				value={newCompany.title}
				onChange={e => setNewCompany({ ...newCompany, title: e.target.value })}
				type='text'
			/>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Описание'
				value={newCompany.description}
				onChange={e =>
					setNewCompany({ ...newCompany, description: e.target.value })
				}
				type='text'
			/>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Канал'
				value={newCompany.telegram_channel}
				onChange={e =>
					setNewCompany({ ...newCompany, telegram_channel: e.target.value })
				}
				type='text'
			/>
			<UiButton onClick={onEditSubmit}>Сохранить</UiButton>
		</div>
	)

	useEffect(() => {
		if (companiesEdit) {
			setNewCompany({
				title: companiesEdit.title,
				description: companiesEdit.description,
				telegram_channel: companiesEdit.telegram_channel!,
			})
		}
	}, [companiesEdit])

	return (
		<Popover
			content={content}
			trigger='click'
			open={open}
			onOpenChange={e => setOpen(e)}
		>
			<FaEdit size='22' className='cursor-pointer' />
		</Popover>
	)
}

export { EditCompany }
