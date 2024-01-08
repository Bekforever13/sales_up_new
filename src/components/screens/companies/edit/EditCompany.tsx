import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, message } from 'antd'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions, useSelectors } from 'src/hooks'
import { MaskedInput } from 'antd-mask-input'
import { UiInput } from 'src/components/ui'
import { useNavigate } from 'react-router-dom'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

const EditCompany: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch } = useActions()
	const navigate = useNavigate()
	const phoneInputRef = useRef<any>(null)
	const markerRef = useRef<any>(null)
	const { companiesEdit } = useSelectors()
	const theme = localStorage.getItem('theme')
	const [lat, setLat] = useState(companiesEdit?.lat || 42.43626)
	const [lng, setLng] = useState(companiesEdit?.lng || 59.651899)

	const onMarkerDragEnd = (e: any) => {
		const newCoords = e.get('target').geometry.getCoordinates()
		setLat(newCoords[0])
		setLng(newCoords[1])
	}

	const onEditSubmit = () => {
		form.validateFields().then(values => {
			const obj = {
				id: companiesEdit?.id,
				...values,
				phone: `+${values.phone.replace(/\D/g, '')}`,
				lat: lat,
				lng: lng,
			}
			axiosInstance.put(`/companies/${companiesEdit?.id}`, obj).then(() => {
				setFetch(Math.random())
				message.success('Успешно')
				navigate('/companies')
			})
		})
	}

	useEffect(() => {
		if (!companiesEdit) {
			navigate('/companies')
		}
		if (companiesEdit) {
			const formattedPhone = companiesEdit?.phone?.replace(
				/(\d{5})(\d{3})(\d{2})(\d{2})/,
				'$1 $2 $3 $4'
			)
			form.setFieldsValue({
				title: companiesEdit.title,
				description: companiesEdit.description,
				telegram_channel: companiesEdit.telegram_channel!,
				phone: formattedPhone,
				lat: companiesEdit.lat!,
				lng: companiesEdit.lng!,
			})
		}
	}, [companiesEdit])

	useEffect(() => {
		if (phoneInputRef.current) {
			phoneInputRef.current.focus()
			setTimeout(() => {
				phoneInputRef.current.blur()
			}, 77)
		}
	}, [])

	return (
		<div className='flex items-start gap-10 text-black dark:text-white bg-[#ececec] dark:bg-slate-600 p-5 rounded-xl'>
			<Form form={form} onFinish={onEditSubmit}>
				<Form.Item label='Название' name='title' rules={[{ required: true }]}>
					<UiInput placeholder='Название' />
				</Form.Item>
				<Form.Item
					label='Описание'
					name='description'
					rules={[{ required: true }]}
				>
					<UiInput placeholder='Описание' />
				</Form.Item>
				<Form.Item
					label='Канал'
					name='telegram_channel'
					rules={[{ required: true }]}
				>
					<UiInput placeholder='Канал' />
				</Form.Item>
				<Form.Item label='Телефон' name='phone' rules={[{ required: true }]}>
					<MaskedInput
						ref={phoneInputRef}
						style={
							theme === 'dark'
								? { color: 'white', background: '#164863' }
								: { color: '#000', background: '#F1F5F9' }
						}
						mask={'+{998}00 000 00 00'}
					/>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Сохранить
					</Button>
				</Form.Item>
			</Form>
			<div>
				<YMaps query={{ apikey: '17de01a8-8e68-4ee2-af08-82eed92f99ec' }}>
					<Map
						style={{ width: '500px', height: '500px' }}
						defaultState={{ center: [lat, lng], zoom: 13 }}
					>
						<Placemark
							options={{ draggable: true }}
							instanceRef={markerRef}
							geometry={[lat, lng]}
							onDragEnd={onMarkerDragEnd}
						/>
					</Map>
				</YMaps>
			</div>
		</div>
	)
}

export { EditCompany }
