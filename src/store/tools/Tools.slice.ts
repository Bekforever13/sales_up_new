import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IToolsInitState, TTool } from './Tools.type'

const initialState: IToolsInitState = {
	tools: [],
	toolsTotal: 10,
}

const ToolsSlice = createSlice({
	name: 'ToolsSlice',
	initialState,
	reducers: {
		setTools(state, { payload }: PayloadAction<TTool[]>) {
			state.tools = payload
		},
		setToolsTotal(state, { payload }: PayloadAction<number>) {
			state.toolsTotal = payload
		},
	},
})

export const { reducer, actions } = ToolsSlice
