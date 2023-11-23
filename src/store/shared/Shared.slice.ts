import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitState } from './Shared.types'

const mode = localStorage.getItem('theme')

const initialState: ISharedInitState<any> = {
	user: {},
	route: '',
	mode: mode === 'dark' ? 'dark' : 'light',
	fetch: 0,
}

const SettingsSlice = createSlice({
	name: 'SettingsSlice',
	initialState: initialState,
	reducers: {
		setUser<T>(state: ISharedInitState<T>, { payload }: PayloadAction<T>) {
			state.user = payload
		},
		setRoute(state, { payload }: PayloadAction<string>) {
			state.route = payload
		},
		toggleColorMode(state, { payload }: PayloadAction<'dark' | 'light'>) {
			if (payload === 'light') {
				localStorage.setItem('theme', (state.mode = 'light'))
			} else {
				localStorage.setItem('theme', (state.mode = 'dark'))
			}
		},
		fetch(state, { payload }: PayloadAction<number>) {
			state.fetch = payload
		},
	},
})

export const { reducer, actions } = SettingsSlice
