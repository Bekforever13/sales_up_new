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
	const [activeCompany, setActiveCompany] = useState('')
	const [options, setOptions] = useState<TOptions[]>([])
	const { setFetch } = useActions()

	const handleSelect = (id: number) => {
		axiosInstance
			.patch('/detail', { company_id: id })
			.then(() => setFetch(Math.random()))
	}

	useEffect(() => {
		axiosInstance.get('/companies').then(res => {
			res.data.data.find((el: ICompany) =>
				el.is_active === true ? setActiveCompany(el.title) : ''
			)
			res.data.data.map((el: ICompany) =>
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
