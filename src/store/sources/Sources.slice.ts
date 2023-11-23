import { createSlice,  } from '@reduxjs/toolkit'
import { ISourceInitState,  } from './Sources.types'

const initialState: ISourceInitState = {
	sources: [],
}

const SourcesSlice = createSlice({
	name: 'SourcesSlice',
	initialState,
	reducers: {
		
	},
})

export const { reducer, actions } = SourcesSlice
