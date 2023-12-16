import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { UiPopconfirm } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'

type TProps = {
	route: string
	id: number
}

const Delete: React.FC<TProps> = ({ route, id }) => {
	const { setFetch } = useActions()
	
	const handleDelete = () => {
		axiosInstance.delete(`/${route}/${id}`).then(() => {
			setFetch(Math.random())
		})
	}
	return (
		<UiPopconfirm
			title='Вы действительно хотите удалить?'
			onConfirm={handleDelete}
		>
			<MdDeleteOutline size='22' className='cursor-pointer' />
		</UiPopconfirm>
	)
}

export { Delete }
