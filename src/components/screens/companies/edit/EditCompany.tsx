import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Form, Button, message } from 'antd'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions, useSelectors } from 'src/hooks'
import { MaskedInput } from 'antd-mask-input'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { UiInput } from 'src/components/ui'
import { useNavigate } from 'react-router-dom'

const EditCompany: React.FC = () => {
	const [form] = Form.useForm()
	const { setFetch } = useActions()
	const navigate = useNavigate()
	const markerRef = useRef<any>(null)
	const { companiesEdit } = useSelectors()
	const theme = localStorage.getItem('theme')
	const [mapCenter, setMapCenter] = useState({
		lat: companiesEdit?.lat,
		lng: companiesEdit?.lng,
	})

	const onEditSubmit = () => {
		form.validateFields().then(values => {
			const obj = {
				id: companiesEdit?.id,
				...values,
				phone: `+${values.phone.replace(/\D/g, '')}`,
				lat: mapCenter.lat,
				lng: mapCenter.lng,
			}
			axiosInstance.put(`/companies/${companiesEdit?.id}`, obj).then(() => {
				setFetch(Math.random())
				message.success('Успешно')
				navigate('/companies')
			})
		})
	}

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					setMapCenter(marker.getLatLng())
				}
			},
		}),
		[]
	)

	useEffect(() => {
		if (companiesEdit) {
			const formattedPhone = companiesEdit?.phone?.replace(
				/(\d{3})(\d{3})(\d{2})(\d{2})/,
				'+$1 $2 $3 $4'
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
			<div className='relative'>
				<MapContainer
					center={
						mapCenter.lat !== 0
							? (mapCenter as any)
							: { lat: 42.43626, lng: 59.631899 }
					}
					className='w-[500px] h-[500px]'
					zoom={16}
				>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
					<Marker
						ref={markerRef}
						draggable
						eventHandlers={eventHandlers}
						position={
							mapCenter.lat !== 0
								? (mapCenter as any)
								: { lat: 42.43626, lng: 59.631899 }
						}
					/>
				</MapContainer>
			</div>
		</div>
	)
}

export { EditCompany }
