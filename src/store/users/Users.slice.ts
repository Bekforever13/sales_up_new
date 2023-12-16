import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsersInitState, TUser } from './Users.types'

const initialState: IUsersInitState = {
	users: [],
	usersTotal: 10,
	userToEdit: null,
}

const UsersSlice = createSlice({
	name: 'UsersSlice',
	initialState,
	reducers: {
		setUsers(state, { payload }: PayloadAction<TUser[]>) {
			state.users = payload
		},
		setUsersTotal(state, { payload }: PayloadAction<number>) {
			state.usersTotal = payload
		},
		setUserToEdit(state, { payload }: PayloadAction<TUser>) {
			state.userToEdit = payload
		},
	},
})

export const { reducer, actions } = UsersSlice
