import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISourceInitState, TLinkEditForm, TSource } from './Sources.types'

const initialState: ISourceInitState = {
	sources: [],
	sourcesTotal: 10,
	sourceToEdit: null,
	sourceID: 0,
	sourceDrawer: false,
	sourceInfoEdit: null,
	sourceInfoDrawer: false,
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
		setSourceID(state, { payload }: PayloadAction<number>) {
			state.sourceID = payload
		},
		setSourceToEdit(state, { payload }: PayloadAction<TSource | null>) {
			state.sourceToEdit = payload
		},
		setSourceDrawer(state, { payload }: PayloadAction<boolean>) {
			state.sourceDrawer = payload
		},
		setSourceInfoEdit(state, { payload }: PayloadAction<TLinkEditForm | null>) {
			state.sourceInfoEdit = payload
		},
		setSourceInfoDrawer(state, { payload }: PayloadAction<boolean>) {
			state.sourceInfoDrawer = payload
		},
	},
})

export const { reducer, actions } = SourcesSlice
