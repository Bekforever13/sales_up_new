import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput, UiSelect } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type TProps = {
	open: boolean
	setOpen: (e: React.SetStateAction<boolean>) => void
}

const AddSourceDrawer: React.FC<TProps> = ({ open, setOpen }) => {
	const { fetch } = useActions()
	const options = [
		{ value: 'Telegram Bot', label: 'Telegram Bot' },
		{ value: 'Web', label: 'Web' },
	]
	const [newSource, setNewSource] = useState({
		name: '',
		type: '',
	})

	const onClose = () => setOpen(false)
	const onSelect = (e: any) => setNewSource({ ...newSource, type: e })


	const onSubmit = () => {
		axiosInstance.post('/sources', newSource).finally(() => {
			setOpen(false)
			fetch(Math.random())
			setNewSource({
				name: '',
				type: '',
			})
		})
	}
	return (
		<UiDrawer placement='right' onClose={onClose} open={open}>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Название...'
				value={newSource.name}
				onChange={e => setNewSource({ ...newSource, name: e.target.value })}
				type='text'
			/>
			<UiSelect
				className='w-full rounded-md mb-5'
				placeholder='Выберите'
				onChange={onSelect}
				options={options}
			/>
			<UiButton onClick={onSubmit}>Добавить</UiButton>
		</UiDrawer>
	)
}

export { AddSourceDrawer }
