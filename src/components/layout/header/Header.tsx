import React from 'react'
import { Mode } from './mode/Mode'
import { Lang } from './lang/Lang'
import { UiBreadCrumbs } from 'src/components/ui'
import { ActiveCompany } from './active/ActiveCompany'

const Header: React.FC = () => {
	return (
		<div className='text-black dark:text-white bg-[#ececec] dark:bg-slate-600 py-2 px-5 rounded-xl flex justify-between items-center'>
			<UiBreadCrumbs />
			<div className='flex items-center justify-center gap-x-5 text-5xl'>
				<ActiveCompany />
				<Mode />
				<Lang />
			</div>
		</div>
	)
}

export { Header }
