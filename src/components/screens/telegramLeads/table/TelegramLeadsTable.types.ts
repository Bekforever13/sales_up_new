export type TTelegramLeadsProps = {
	page: any
	setPage: (page: React.SetStateAction<number>) => void
}
export type TTelegramLeadsSelect = {
	value: number
	label: string
}
export type TTelegramLead = {
	id: number
	name: string
	phone: string
	link: string
}