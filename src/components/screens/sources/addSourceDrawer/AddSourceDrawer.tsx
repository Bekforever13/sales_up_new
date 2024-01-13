import { message } from 'antd'
import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

const AddSourceDrawer: React.FC = () => {
	const { setFetch, setSourceDrawer, setSourceToEdit } = useActions()
	const { sourceDrawer } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	const [newSource, setNewSource] = useState({
		title: '',
	})

	const onClose = () => {
		setSourceDrawer(false)
		setSourceToEdit(null)
		setNewSource({ title: '' })
	}

	const onSubmit = () => {
		setIsLoading(true)
		axiosInstance
			.post('/sources', newSource)
			.then(() => {
				setSourceDrawer(false)
				setFetch(Math.random())
				message.success('Успешно')
				setNewSource({
					title: '',
				})
			})
			.catch(() => message.error('Повторите попытку'))
	}

	React.useEffect(() => {
		if (!newSource.title) {
			setButtonDisabled(true)
		}
		if (newSource.title) {
			setButtonDisabled(false)
		}
	}, [newSource.title])

	React.useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (isLoading) {
			timer = setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}
		return () => clearTimeout(timer)
	}, [isLoading])

	return (
		<UiDrawer
			title='Новый источник'
			placement='right'
			onClose={onClose}
			open={sourceDrawer}
		>
			<UiInput
				placeholder='Название...'
				value={newSource.title}
				onChange={e => setNewSource({ ...newSource, title: e.target.value })}
				type='text'
			/>
			<UiButton
				style={{ marginTop: '20px' }}
				disabled={isButtonDisabled}
				loading={isLoading}
				onClick={onSubmit}
			>
				Добавить
			</UiButton>
		</UiDrawer>
	)
}

export { AddSourceDrawer }
