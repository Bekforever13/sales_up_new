import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'src/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectors = () => {
	const {
		auth,
		leads,
		sources,
		shared,
		courses,
		companies,
		users,
		telegraph,
		tickets,
	} = useAppSelector(s => s)

	return {
		...auth,
		...telegraph,
		...courses,
		...leads,
		...sources,
		...shared,
		...companies,
		...users,
		...tickets,
	}
}
