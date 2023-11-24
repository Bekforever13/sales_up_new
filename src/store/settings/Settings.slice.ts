import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	ISettingInitState,
	TSettingBot,
	TSettingStatus,
} from './Settings.types'

const initialState: ISettingInitState = {
	bot: null,
	statuses: [],
}

const SettingsSlice = createSlice({
	name: 'SettingsSlice',
	initialState,
	reducers: {
		setBots: (state, { payload }: PayloadAction<TSettingBot>) => {
			state.bot = payload
		},
		removeBot: state => {
			state.bot = null
		},
		setStatuses: (state, { payload }: PayloadAction<TSettingStatus[]>) => {
			state.statuses = payload
		},
		removeStatus: (state, { payload }: PayloadAction<string>) => {
			state.statuses = state.statuses.filter(status => status.id !== payload)
		},
	},
})

export const { reducer, actions } = SettingsSlice
