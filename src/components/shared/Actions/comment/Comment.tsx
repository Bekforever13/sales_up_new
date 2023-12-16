import React, { useState } from 'react'
import { axiosInstance } from 'src/services/axiosInstance'
import { FaRegCommentAlt } from 'react-icons/fa'
import { TLeads } from 'src/store/leads/Leads.types'
import { UiButton, UiPopover } from 'src/components/ui'
import { useActions } from 'src/hooks'
import { message } from 'antd'

type TProps = {
	user: TLeads
	route: string
}

const Comment: React.FC<TProps> = ({ user, route }) => {
	const [open, setOpen] = useState(false)
	const { setFetch } = useActions()
	const [comment, setComment] = useState({
		...user,
		comment: '',
	})

	const send = () => {
		setOpen(false)
		axiosInstance.put(`/${route}/${user.id}`, comment).then(() => {
			setFetch(Math.random())
			message.success('Успешно')
		})
	}

	const handleOpenChange = (open: any) => setOpen(open)

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				maxLength={200}
				value={comment.comment}
				onChange={e => setComment({ ...comment, comment: e.target.value })}
				rows={4}
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none bg-white text-black dark:bg-slate-600 dark:-text-white'
			/>
			<UiButton onClick={send}>Send</UiButton>
		</div>
	)

	return (
		<UiPopover
			content={content}
			title='Комментарий'
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
		>
			<FaRegCommentAlt className='cursor-pointer' size='22' />
		</UiPopover>
	)
}

export { Comment }
