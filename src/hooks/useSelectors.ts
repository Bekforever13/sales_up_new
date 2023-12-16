import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'src/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectors = () => {
	const { auth, leads, sources, shared, courses, companies, users } =
		useAppSelector(s => s)

	return {
		...auth,
		...courses,
		...leads,
		...sources,
		...shared,
		...companies,
		...users,
	}
}
