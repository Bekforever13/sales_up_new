import { message } from 'antd'
import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

const AddSourceDrawer: React.FC = () => {
	const { setFetch, setSourceDrawer, setSourceToEdit } = useActions()
	const { sourceDrawer } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)
	const [newSource, setNewSource] = useState({
		title: '',
	})

	const onClose = () => {
		setSourceDrawer(false)
		setSourceToEdit(null)
		setNewSource({ title: '' })
	}

	const onSubmit = () => {
		setButtonDisabled(true)
		axiosInstance.post('/sources', newSource).finally(() => {
			setSourceDrawer(false)
			setFetch(Math.random())
			message.success('Успешно')
			setNewSource({
				title: '',
			})
		})
	}

	React.useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (isButtonDisabled) {
			timer = setTimeout(() => {
				setButtonDisabled(false)
			}, 2000)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [isButtonDisabled])

	return (
		<UiDrawer placement='right' onClose={onClose} open={sourceDrawer}>
			<UiInput
				placeholder='Название...'
				value={newSource.title}
				onChange={e => setNewSource({ ...newSource, title: e.target.value })}
				type='text'
			/>
			<UiButton
				style={{ marginTop: '20px' }}
				loading={isButtonDisabled}
				onClick={onSubmit}
			>
				Добавить
			</UiButton>
		</UiDrawer>
	)
}

export { AddSourceDrawer }
