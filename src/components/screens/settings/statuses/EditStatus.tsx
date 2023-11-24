import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { UiButton, UiInput, UiPopover } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { axiosInstance } from 'src/services/axiosInstance'
import { TSettingStatus } from 'src/store/settings/Settings.types'

const EditStatus: React.FC<{ status: TSettingStatus }> = ({ status }) => {
	const [open, setOpen] = useState(false)
	const { fetch } = useActions()

	const [edit, setEdit] = useState({ id: '', name: '' })

	const handleOpenChange = (newOpen: boolean) => setOpen(newOpen)

	const onSubmit = (id: string) => {
		axiosInstance.put(`/statuses/${id}`, { name: edit.name }).then(() => {
			fetch(Math.random())
			setOpen(false)
			setEdit({ id: '', name: '' })
		})
	}

	return (
		<UiPopover
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
			content={
				<div className='w-[200px] flex flex-col gap-y-5'>
					<UiInput
						className='w-full border-[1px] border-black py-2 px-4 rounded-md'
						placeholder='Новое название статуса...'
						value={edit.name}
						onChange={e => setEdit({ ...edit, name: e.target.value })}
						type='text'
					/>
					<UiButton onClick={() => onSubmit(edit?.id)}>Сохранить</UiButton>
				</div>
			}
		>
			<UiButton onClick={() => setEdit(status)}>
				<FaEdit size='22' />
			</UiButton>
		</UiPopover>
	)
}

export { EditStatus }
