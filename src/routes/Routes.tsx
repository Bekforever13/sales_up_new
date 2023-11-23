import {
	Home,
	Tools,
	Settings,
	Sources,
	Orders,
	Courses,
	Leads,
} from 'src/components/screens'

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/leads', element: <Leads /> },
	{ path: '/orders', element: <Orders /> },
	{ path: '/courses', element: <Courses /> },
	{ path: '/sources', element: <Sources /> },
	{ path: '/tools', element: <Tools /> },
	{ path: '/settings', element: <Settings /> },
]
