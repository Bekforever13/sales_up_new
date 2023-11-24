import React, { useEffect, useState } from 'react'
import { UiButton, UiDrawer, UiInput, UiSelect } from 'src/components/ui'
import { useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type TProps = {
	open: boolean
	setOpen: (e: React.SetStateAction<boolean>) => void
}

const AddTool: React.FC<TProps> = ({ open, setOpen }) => {
	const { tools } = useSelectors()
	const [options, setOptions] = useState<{ value: number; label: string }[]>([])
	const [newTool, setNewTool] = useState<{
		source_id: string | null
		sum: number | null
	}>({
		source_id: null,
		sum: null,
	})

	useEffect(() => {
		tools.map(item => {
			setOptions(prev => [
				...prev,
				{
					value: item.source_id,
					label: item.source_name,
				},
			])
		})
	}, [tools])

	const onSubmit = () => {
		axiosInstance.post('/links', newTool)
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
