import React, { useState, useEffect } from 'react'
import { Popover } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiButton, UiInput, UiSelect } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'

const EditSource: React.FC = () => {
	const [open, setOpen] = useState(false)
	const { fetch } = useActions()
	const { sourceToEdit } = useSelectors()
	const [newDataSource, setNewDataSource] = useState({
		name: sourceToEdit?.name,
		type: sourceToEdit?.type,
	})
	const options = [
		{
			value: 'Telegram Bot',
			label: 'Telegram Bot',
		},
		{
			value: 'Web',
			label: 'Web',
		},
	]

	const onSubmit = () => {
		const obj = { id: sourceToEdit?.id, ...newDataSource }
		axiosInstance.put(`/sources/${sourceToEdit?.id}`, obj).then(() => {
			fetch(Math.random())
			setOpen(false)
		})
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Название...'
				value={newDataSource.name}
				onChange={e =>
					setNewDataSource({ ...newDataSource, name: e.target.value })
				}
				type='text'
			/>
			<UiSelect options={options} defaultValue={sourceToEdit?.type} />
			<UiButton onClick={onSubmit}>Сохранить</UiButton>
		</div>
	)

	useEffect(() => {
		if (sourceToEdit) {
			setNewDataSource({
				name: sourceToEdit.name,
				type: sourceToEdit.type,
			})
		}
	}, [sourceToEdit])

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

export { EditSource }
