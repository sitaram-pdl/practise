import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const LeafletMapContainer = () => {
  const position = [22.300794, 114.16785];

  return (
    <MapContainer center={position} zoom={15}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          12th Floor, 33 Canton Rd, <br /> Tsim Sha Tsui, Hong Kong
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default LeafletMapContainer;
