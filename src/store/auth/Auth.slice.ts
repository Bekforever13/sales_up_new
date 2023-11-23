import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isAuth: false,
}

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setAuth(state, { payload }: PayloadAction<boolean>) {
			state.isAuth = payload
		},
	},
})

export const { reducer, actions } = authSlice
