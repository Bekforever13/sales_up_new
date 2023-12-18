import React, { useState, useEffect } from 'react'
import { Popover } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiButton, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'

const EditSourceInfo: React.FC = () => {
	const [open, setOpen] = useState(false)
	const { setFetch } = useActions()
	const { sourceInfoEdit } = useSelectors()
	const [newDataSource, setNewDataSource] = useState({
		title: sourceInfoEdit?.title,
		price: sourceInfoEdit?.price,
	})

	const onSubmit = () => {
		const obj = { id: sourceInfoEdit?.id, ...newDataSource }
		axiosInstance.put(`/links/${sourceInfoEdit?.id}`, obj).then(() => {
			setFetch(Math.random())
			setOpen(false)
		})
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Название...'
				value={newDataSource.title}
				onChange={e =>
					setNewDataSource({ ...newDataSource, title: e.target.value })
				}
				type='text'
			/>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Цена...'
				value={newDataSource.price}
				onChange={e =>
					setNewDataSource({ ...newDataSource, price: e.target.value })
				}
				type='number'
			/>
			<UiButton onClick={onSubmit}>Сохранить</UiButton>
		</div>
	)

	useEffect(() => {
		if (sourceInfoEdit) {
			setNewDataSource({
				title: sourceInfoEdit.title,
				price: sourceInfoEdit.price,
			})
		}
	}, [sourceInfoEdit])

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

export { EditSourceInfo }
