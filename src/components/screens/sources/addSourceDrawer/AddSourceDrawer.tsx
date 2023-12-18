import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

const AddSourceDrawer: React.FC = () => {
	const { setFetch, setSourceDrawer } = useActions()
	const { sourceDrawer } = useSelectors()
	const [newSource, setNewSource] = useState({
		title: '',
	})

	const onClose = () => setSourceDrawer(false)

	const onSubmit = () => {
		axiosInstance.post('/sources', newSource).finally(() => {
			setSourceDrawer(false)
			setFetch(Math.random())
			setNewSource({
				title: '',
			})
		})
	}
	return (
		<UiDrawer placement='right' onClose={onClose} open={sourceDrawer}>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Название...'
				value={newSource.title}
				onChange={e => setNewSource({ ...newSource, title: e.target.value })}
				type='text'
			/>
			<UiButton onClick={onSubmit}>Добавить</UiButton>
		</UiDrawer>
	)
}

export { AddSourceDrawer }
