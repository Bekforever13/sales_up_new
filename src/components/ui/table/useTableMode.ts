export const useTableMode = (mode: 'dark' | 'light') => {
	const dark = {
		colorText: '#fff',
		colorTextPlaceholder: '#94A3B8',
		colorPrimaryBg: '#164863',
		colorPrimaryHover: '#0766AD',
		colorPrimaryTextHover: '#94A3B8',
		colorBgContainer: '#164863',
		colorBgElevated: '#164863',
		controlItemBgActive: '#1A253A',
		controlItemBgHover: '#1A253A',
	}
	const light = {
		colorText: '#6D5580',
		colorTextPlaceholder: '#94A3B8',
		colorPrimaryBg: '#F1F5F9',
		colorPrimaryHover: '#0766AD',
		colorPrimaryTextHover: '#94A3B8',
		colorBgContainer: '#F1F5F9',
		colorBgElevated: '#F1F5F9',
		controlItemBgActive: '#EDE9FE',
		controlItemBgHover: '#EDE9FE',
	}
	if (mode === 'dark') return dark
	return light
}
