export const useDataPickerMode = (mode: 'dark' | 'light') => {
	const dark = {
		colorBgElevated: '#171221',
		colorPrimaryBgHover: '#1677FF',
		colorBgContainer: '#164863',
		colorText: '#94A3B8',
		colorTextPlaceholder: '#94A3B8',
		colorPrimaryHover: '#0766AD',
		colorPrimaryTextHover: '#94A3B8',
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
