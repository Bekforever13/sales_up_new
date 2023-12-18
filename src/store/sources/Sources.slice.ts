import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISourceInitState, TLinkEditForm, TSource } from './Sources.types'

const initialState: ISourceInitState = {
	sources: [],
	sourcesTotal: 10,
	sourceToEdit: null,
	sourceDrawer: false,
	sourceInfoEdit: null,
}

const SourcesSlice = createSlice({
	name: 'SourcesSlice',
	initialState,
	reducers: {
		setSources(state, { payload }: PayloadAction<TSource[]>) {
			state.sources = payload
		},
		setSourcesTotal(state, { payload }: PayloadAction<number>) {
			state.sourcesTotal = payload
		},
		setSourceToEdit(state, { payload }: PayloadAction<TSource>) {
			state.sourceToEdit = payload
		},
		setSourceDrawer(state, { payload }: PayloadAction<boolean>) {
			state.sourceDrawer = payload
		},
		setSourceInfoEdit(state, { payload }: PayloadAction<TLinkEditForm>) {
			state.sourceInfoEdit = payload
		},
	},
})

export const { reducer, actions } = SourcesSlice
