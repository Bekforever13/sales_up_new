export type TSource = {
	id: number
	title: string
}

export interface ISourceInitState {
	sources: TSource[]
	sourcesTotal: number
	sourceToEdit: TSource | null
	sourceDrawer: boolean
}