import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITelegramLeadsInitState, TTelegramLeads } from './Telegraph.types'

const initialState: ITelegramLeadsInitState = {
	telegraphLeads: [],
	telegraphLeadsTotal: 10,
}

const TelegraphSlice = createSlice({
	name: 'TelegraphSlice',
	initialState,
	reducers: {
		setTelegraphLeads: (state, { payload }: PayloadAction<TTelegramLeads[]>) => {
			state.telegraphLeads = payload
		},
		setTelegraphLeadsTotal: (state, { payload }: PayloadAction<number>) => {
			state.telegraphLeadsTotal = payload
		},
	},
})

export const { reducer, actions } = TelegraphSlice
