import { FC, useEffect, useState } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { UiSelect } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { ICompany } from 'src/store/companies/Companies.types'

type TOptions = {
	value: number
	label: string
}

const ActiveCompany: FC = () => {
	const [activeCompany, setActiveCompany] = useState(0)
	const [options, setOptions] = useState<TOptions[]>([])
	const { setFetch } = useActions()

	const handleSelect = (id: number) => {
		setActiveCompany(id)
		axiosInstance
			.patch('/detail', { company_id: id })
			.then(() => setFetch(Math.random()))
	}

	useEffect(() => {
		axiosInstance.get('/companies').then(res => {
			res.data.data.map((el: ICompany) =>
				setOptions(prev => [...prev, { label: el.title, value: el.id }])
			)
			res.data.data.find((el: ICompany) =>
				el.is_active === true ? setActiveCompany(el.id) : ''
			)
		})
	}, [])

	return (
		<>
			<p className='text-xs'>Активная компания</p>
			<UiSelect
				style={{ width: '100%' }}
				options={options}
				value={activeCompany}
				onChange={e => handleSelect(e)}
			/>
		</>
	)
}

export { ActiveCompany }
