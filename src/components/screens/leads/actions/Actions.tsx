import React from 'react'
import { Comment } from './comment/Comment'
import { Telegram } from './telegram/Telegram'

const Actions: React.FC<any> = ({ user }) => {
	return (
		<div className='flex items-center gap-2'>
			<Comment user={user} />
			<Telegram user={user} />
		</div>
	)
}

export { Actions }
