export type TSource = {
	id: number
	name: string
	type: string
}

export interface ISourceInitState {
	sources: TSource[]
	sourcesTotal: number
	sourceToEdit: TSource | null
}