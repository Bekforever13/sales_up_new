import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { UiButton, UiDrawer, UiInput, UiSelect } from 'src/components/ui'
import { axiosInstance } from 'src/services/axiosInstance'

type TProps = {
	open: boolean
	setOpen: (e: React.SetStateAction<boolean>) => void
}

const AddTool: React.FC<TProps> = ({ open, setOpen }) => {
	const [options, setOptions] = useState<{ value: number; label: string }[]>([])
	const [newTool, setNewTool] = useState<{
		source_id: string | null
		sum: number | null
	}>({
		source_id: null,
		sum: null,
	})

	useEffect(() => {
		axiosInstance.get('/sources').then(res => {
			res.data.data.map((item: any) => {
				setOptions(prev => [
					...prev,
					{
						value: item.id,
						label: item.name,
					},
				])
			})
		})
	}, [])

	const onSubmit = () => {
		axiosInstance.post('/links', newTool).then(() => {
			notification.success({
				message: 'Успешно ✅',
				style: { color: 'Green', width: '200px' },
				placement: 'top',
			})
			setOpen(false)
		})
	}

	const onClose = () => setOpen(false)

	return (
		<UiDrawer placement='right' onClose={onClose} open={open}>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Введите цену...'
				type='number'
				value={newTool.sum || ''}
				onChange={e => setNewTool({ ...newTool, sum: +e.target.value })}
			/>
			<UiSelect
				className='w-full rounded-md mb-5'
				placeholder='Выберите бота'
				options={options}
				onSelect={e => setNewTool({ ...newTool, source_id: e })}
			/>
			<UiButton onClick={onSubmit}>Добавить</UiButton>
		</UiDrawer>
	)
}

export { AddTool }
