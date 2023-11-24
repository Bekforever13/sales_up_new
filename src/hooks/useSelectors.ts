import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'src/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectors = () => {
	const { auth } = useAppSelector(s => s)
	const { courses } = useAppSelector(s => s)
	const { leads } = useAppSelector(s => s)
	const { orders } = useAppSelector(s => s)
	const { settings } = useAppSelector(s => s)
	const { sources } = useAppSelector(s => s)
	const { tools } = useAppSelector(s => s)
	const { shared } = useAppSelector(s => s)

	return {
		...auth,
		...courses,
		...leads,
		...orders,
		...settings,
		...sources,
		...tools,
		...shared,
	}
}
