import React, { useEffect } from 'react'
import { Form, Button, message } from 'antd'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions, useSelectors } from 'src/hooks'
import { MaskedInput } from 'antd-mask-input'
import 'leaflet/dist/leaflet.css'
import { UiInput } from 'src/components/ui'
import { useNavigate } from 'react-router-dom'
import { formatPhone } from 'src/utils/shared'
import { Map } from './Map'

const EditCompany: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch } = useActions()
	const navigate = useNavigate()
	const { companiesEdit, companiesCoordinates } = useSelectors()
	const theme = localStorage.getItem('theme')

	useEffect(() => {
		if (!companiesEdit?.id) {
			navigate('/companies')
		}
	}, [companiesEdit?.id])

	const onEditSubmit = () => {
		form.validateFields().then(values => {
			const obj = {
				id: companiesEdit?.id,
				...values,
				lat: companiesCoordinates?.lat,
				lng: companiesCoordinates?.lng,
				phone: `+${values.phone.replace(/\D/g, '')}`,
			}
			axiosInstance.put(`/companies/${companiesEdit?.id}`, obj).then(() => {
				setFetch(Math.random())
				message.success('Успешно')
				navigate('/companies')
			})
		})
	}

	useEffect(() => {
		if (companiesEdit) {
			form.setFieldsValue({
				title: companiesEdit.title,
				description: companiesEdit.description,
				telegram_channel: companiesEdit.telegram_channel!,
				phone: formatPhone(companiesEdit.phone),
				lat: companiesEdit.lat!,
				lng: companiesEdit.lng!,
			})
		}
	}, [companiesEdit])

	return (
		<div className='flex items-start gap-10 text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl'>
			<Form layout='vertical' form={form} onFinish={onEditSubmit}>
				<Form.Item
					label='Название'
					name='title'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Название' />
				</Form.Item>
				<Form.Item
					label='Описание'
					name='description'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Описание' />
				</Form.Item>
				<Form.Item
					label='Канал'
					name='telegram_channel'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<UiInput placeholder='Канал' />
				</Form.Item>
				<Form.Item
					label='Телефон'
					name='phone'
					rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
				>
					<MaskedInput
						style={
							theme === 'dark'
								? { color: 'white', background: '#164863' }
								: { color: '#000', background: '#F1F5F9' }
						}
						mask={'+{998}00 000 00 00'}
					/>
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					Сохранить
				</Button>
			</Form>
			<div className='relative'>
				<Map />
			</div>
		</div>
	)
}

export { EditCompany }
