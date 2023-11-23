import React, { useState } from 'react'
import { Popover } from 'antd'
import { axiosInstance } from 'src/services/axiosInstance'
import { useActions } from 'src/hooks/useActions'
import { FaRegCommentAlt } from 'react-icons/fa'

const Comment: React.FC<any> = user => {
	const [open, setOpen] = useState(false)
	const { addComment } = useActions()
	const [comment, setComment] = useState({
		...user.user,
		comment: '',
	})

	const send = () => {
		setOpen(false)
		axiosInstance.put(`/leads/${user.user.id}`, comment)
		addComment(comment)
	}

	const handleOpenChange = (open: any) => setOpen(open)

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				maxLength={200}
				value={comment.comment}
				onChange={e => setComment({ ...comment, comment: e.target.value })}
				rows={4}
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none'
			/>
			<button className='text-[#1677ff]' onClick={send}>
				Send
			</button>
		</div>
	)

	return (
		<Popover
			content={content}
			title='Комментарий'
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
			className='text-black dark:text-black cursor-pointer'
		>
			<FaRegCommentAlt color='black' />
		</Popover>
	)
}

export { Comment }
