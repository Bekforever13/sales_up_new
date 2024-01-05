import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	currentRoleId: 0,
}

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setCurrentRoleId(state, { payload }: PayloadAction<number>) {
			state.currentRoleId = payload
		},
	},
})

export const { reducer, actions } = authSlice
