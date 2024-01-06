import React, { useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useActions, useSelectors } from 'src/hooks'

const Map: React.FC = () => {
	const markerRef = useRef<any>(null)
	const { setCompaniesCoordinates } = useActions()
	const { companiesCoordinates } = useSelectors()

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					setCompaniesCoordinates(marker.getLatLng())
				}
			},
		}),
		[companiesCoordinates]
	)

	return (
		<MapContainer
			center={
				companiesCoordinates?.lat !== 0
					? (companiesCoordinates as any)
					: { lat: 42.43626, lng: 59.631899 }
			}
			className='w-[500px] h-[500px]'
			zoom={16}
		>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker
				ref={markerRef}
				draggable
				eventHandlers={eventHandlers}
				position={
					companiesCoordinates?.lat !== 0
						? (companiesCoordinates as any)
						: { lat: 42.43626, lng: 59.631899 }
				}
			/>
		</MapContainer>
	)
}

export { Map }
