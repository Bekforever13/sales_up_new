import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isAuth: false,
	currentRoleId: 0,
}

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setAuth(state, { payload }: PayloadAction<boolean>) {
			state.isAuth = payload
		},
		setCurrentRoleId(state, { payload }: PayloadAction<number>) {
			state.currentRoleId = payload
		},
	},
})

export const { reducer, actions } = authSlice
