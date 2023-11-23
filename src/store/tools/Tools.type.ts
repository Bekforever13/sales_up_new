export type TTool = {
	clicked: number
	id: number
	source_id: number
	source_name: string
	sum: number
	url: string
}

export interface IToolsInitState {
	tools: TTool[]
}