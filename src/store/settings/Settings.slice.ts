import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	ISettingInitState,
	TSettingBot,
	TSettingStatus,
} from './Settings.types'

const initialState: ISettingInitState = {
	bots: [],
	statuses: [],
}

const SettingsSlice = createSlice({
	name: 'SettingsSlice',
	initialState,
	reducers: {
		setBots: (state, { payload }: PayloadAction<TSettingBot[]>) => {
			state.bots = payload
		},
		removeBot: state => {
			state.bots = []
		},
		addBot: (state, { payload }: PayloadAction<TSettingBot>) => {
			state.bots.push(payload)
		},
		setStatuses: (state, { payload }: PayloadAction<TSettingStatus[]>) => {
			state.statuses = payload
		},
		removeStatus: (state, { payload }: PayloadAction<number>) => {
			state.statuses = state.statuses.filter(status => status.id !== payload)
		},
	},
})

export const { reducer, actions } = SettingsSlice
