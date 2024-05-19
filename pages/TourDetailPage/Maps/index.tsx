import React, { useRef, useEffect, useState } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import './map.css'

interface IMaps {
  coordinates: number[]
}

const Maps = (props: IMaps) => {
  const { coordinates } = props
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const startLocation =
    coordinates && coordinates.length >= 2
      ? { lat: coordinates[1], lng: coordinates[0] }
      : { lat: 0, lng: 0 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "PAckuW1Q20LwrRJCIs0n";

  useEffect(() => {
    if (
      !mapContainer.current ||
      map.current ||
      (startLocation.lng === 0 && startLocation.lat === 0)
    )
      return

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [startLocation.lng, startLocation.lat],
      zoom: zoom,
    })
    new maptilersdk.Marker({ color: '#FF0000' })
      .setLngLat([startLocation.lng, startLocation.lat])
      .addTo(map.current)
  }, [startLocation.lng, startLocation.lat, zoom])

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  )
}

export default Maps
