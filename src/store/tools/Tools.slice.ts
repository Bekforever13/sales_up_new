import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IToolsInitState, TTool } from './Tools.type'

const initialState: IToolsInitState = {
	tools: [],
}

const ToolsSlice = createSlice({
	name: 'ToolsSlice',
	initialState,
	reducers: {
		
	},
})

export const { reducer, actions } = ToolsSlice
