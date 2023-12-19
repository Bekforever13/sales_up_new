import React from 'react'
import { UiInput } from 'src/components/ui'

type TProps = {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

const LeadsFilters: React.FC<TProps> = props => {
	const { search, setSearch } = props

	return (
		<UiInput
			allowClear
			size='large'
			placeholder='Введите имя или номер'
			value={search}
			style={{ maxWidth: '400px' }}
			onChange={e => setSearch(e.target.value)}
		/>
	)
}

export { LeadsFilters }
