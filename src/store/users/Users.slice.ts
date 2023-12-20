import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsersInitState, TUser, TUserDrawerForm } from './Users.types'

const initialState: IUsersInitState = {
	users: [],
	usersTotal: 10,
	userToEdit: null,
	userDrawer: false,
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
		setUserDrawer(state, { payload }: PayloadAction<boolean>) {
			state.userDrawer = payload
		},
		setUserToEdit(state, { payload }: PayloadAction<TUserDrawerForm>) {
			state.userToEdit = payload
		},
	},
})

export const { reducer, actions } = UsersSlice
