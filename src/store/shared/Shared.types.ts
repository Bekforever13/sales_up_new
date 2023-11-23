export interface ISharedInitState<T> {
	user: T
	route: string
	mode: 'dark' | 'light'
	fetch: number
}
