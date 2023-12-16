import { FC, useEffect, useState } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { TCompany } from './ActiveCompany.types'
import { UiSelect } from 'src/components/ui'

type TOptions = {
	value: number
	label: string
}

const ActiveCompany: FC = () => {
	const [activeCompany, setActiveCompany] = useState('')
	const [options, setOptions] = useState<TOptions[]>([])

	const handleSelect = (id: number) => {
		axiosInstance
			.patch('/detail', { company_id: id })
			.then(res => console.log(res))
	}

	useEffect(() => {
		axiosInstance.get('/companies').then(res => {
			res.data.data.find((el: TCompany) =>
				el.is_active === true ? setActiveCompany(el.title) : ''
			)
			res.data.data.map((el: TCompany) =>
				setOptions(prev => [...prev, { label: el.title, value: el.id }])
			)
		})
	}, [])

	return (
		<>
			<p className='text-xs'>Активная компания</p>
			<UiSelect
				options={options}
				value={activeCompany}
				onChange={e => handleSelect(e)}
			/>
		</>
	)
}

export { ActiveCompany }
