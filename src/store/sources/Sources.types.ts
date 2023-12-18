export type TSource = {
	id: number
	title: string
}

export type TLink = {
	id: number
	price: number
	title: string
	created_at: string
	updated_at: string
	qr_code: string
	url: string
}

export interface ISourceInitState {
	sources: TSource[]
	sourcesTotal: number
	sourceToEdit: TSource | null
	sourceDrawer: boolean
	sourceInfoEdit: TLinkEditForm | null
}

export type TLinkEditForm = {
	id?: number
	title: string
	price: string
}
