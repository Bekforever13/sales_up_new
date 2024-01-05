import { message } from 'antd'
import React, { useState } from 'react'
import { UiButton, UiDrawer, UiInput } from 'src/components/ui'
import { useActions, useSelectors } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

const AddCompanyDrawer: React.FC = () => {
	const { setFetch, setCompaniesDrawer } = useActions()
	const { companiesDrawer } = useSelectors()
	const [isButtonDisabled, setButtonDisabled] = React.useState(false)
	const [newCompany, setNewCompany] = useState({
		title: '',
		description: '',
	})

	const onClose = () => setCompaniesDrawer(false)

	const onSubmit = () => {
		setButtonDisabled(true)
		axiosInstance.post('/companies', newCompany).then(() => {
			setCompaniesDrawer(false)
			message.success('Успешно')
			setNewCompany({
				title: '',
				description: '',
			})
			setFetch(Math.random())
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
		<UiDrawer
			placement='right'
			title='Новый филиал'
			onClose={onClose}
			open={companiesDrawer}
		>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Название...'
				type='text'
				value={newCompany.title}
				onChange={e => setNewCompany({ ...newCompany, title: e.target.value })}
			/>
			<UiInput
				className='w-full border-[1px] border-black py-2 px-4 rounded-md mb-5'
				placeholder='Описание...'
				type='text'
				value={newCompany.description}
				onChange={e =>
					setNewCompany({ ...newCompany, description: e.target.value })
				}
			/>
			<UiButton loading={isButtonDisabled} onClick={onSubmit}>
				Добавить
			</UiButton>
		</UiDrawer>
	)
}

export { AddCompanyDrawer }
