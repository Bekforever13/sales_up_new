import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITelegramLeadsInitState, TTelegramLeads } from './Telegraph.types'

const initialState: ITelegramLeadsInitState = {
	telegraphLeads: [],
	telegraphLeadsTotal: 10,
	telegramChatID: 0,
	telegramChatDrawer: false,
}

const TelegraphSlice = createSlice({
	name: 'TelegraphSlice',
	initialState,
	reducers: {
		setTelegraphLeads: (
			state,
			{ payload }: PayloadAction<TTelegramLeads[]>
		) => {
			state.telegraphLeads = payload
		},
		setTelegraphLeadsTotal: (state, { payload }: PayloadAction<number>) => {
			state.telegraphLeadsTotal = payload
		},
		setTelegramChatID: (state, { payload }: PayloadAction<number>) => {
			state.telegramChatID = payload
		},
		setTelegramChatDrawer: (state, { payload }: PayloadAction<boolean>) => {
			state.telegramChatDrawer = payload
		},
	},
})

export const { reducer, actions } = TelegraphSlice
