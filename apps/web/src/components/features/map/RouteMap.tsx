import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import L from "leaflet"

export default function KotaniAreaMap(props: any){
  const { position, zoom } = props;

  // 表示領域の限界範囲指定
  const northEast = L.latLng(34.45255342111746, 132.85029323513135)
  const southWest = L.latLng(34.425214, 132.8295984)
  const bounds = L.latLngBounds(southWest, northEast)

  return (
    <MapContainer center={position} zoom={zoom} maxBounds={bounds} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          きれいなCSS3ポップアップ。<br /> 簡単にカスタマイズできます。
        </Popup>
      </Marker>
    </MapContainer>
  )
}
