import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef, useEffect } from 'react';
import { MapPinIcon } from 'lucide-react';
import { iconsForLeafpad } from '../../assets/assets';

export default function LiveMap({
  order,
  liveLocation,
}: {
  order: any;
  liveLocation: any;
}) {
  const mapRef = useRef<any>(null);

  // Default to Ahmedabad if no coordinates available
  const defaultLng = 72.5714;
  const defaultLat = 23.0225;

  const truckLng = liveLocation?.lng || 0;
  const truckLat = liveLocation?.lat || 0;
  const hasTruckLoc = truckLat !== 0;

  const destLng = order?.shippingAddress?.lng || 0;
  const destLat = order?.shippingAddress?.lat || 0;
  const hasDestLoc = destLat !== 0;

  // Determine center priority: Truck > Destination > Default
  const centerLng = hasTruckLoc ? truckLng : hasDestLoc ? destLng : defaultLng;
  const centerLat = hasTruckLoc ? truckLat : hasDestLoc ? destLat : defaultLat;

  // Animate the map camera to follow the truck smoothly (MapLibre's WebGL makes this 60fps)
  useEffect(() => {
    if (mapRef.current && hasTruckLoc) {
      mapRef.current.flyTo({
        center: [truckLng, truckLat], 
        duration: 2500, // Matches the update tick for continuous panning
        essential: true, 
      });
    }
  }, [truckLat, truckLng, hasTruckLoc]);

  return (
    <>
      {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
        <div
          className="rounded-2xl overflow-hidden border border-app-border relative"
          style={{ height: 280 }}
        >
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: centerLng,
              latitude: centerLat,
              zoom: 14.5
            }}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            style={{ width: '100%', height: '100%' }}
            attributionControl={false}
            onLoad={(e) => {
              // Make scroll zoom faster and smoother
              const map = e.target;
              map.scrollZoom.setWheelZoomRate(1 / 100); // Default is 1/450
              map.scrollZoom.setZoomRate(1 / 50); // Default is 1/100
            }}
          >
            {/* Delivery Truck Marker */}
            {hasTruckLoc && (
              <Marker longitude={truckLng} latitude={truckLat} anchor="bottom">
                <div style={{ transition: 'transform 2s linear' }}>
                  <img 
                    src={iconsForLeafpad.truck} 
                    alt="Truck" 
                    style={{ width: '36px', height: '36px' }} 
                  />
                </div>
              </Marker>
            )}
            
            {/* Destination Marker */}
            {hasDestLoc && (
              <Marker longitude={destLng} latitude={destLat} anchor="bottom">
                <img src={iconsForLeafpad.destination} alt="Destination" style={{ width: '32px', height: '32px' }} />
              </Marker>
            )}
          </Map>

          {/* Show a small floating overlay if we are still waiting for driver assignment */}
          {!hasTruckLoc && (
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-app-border shadow-sm flex items-center gap-2 w-max max-w-[90%]">
               <MapPinIcon className="size-3.5 text-app-orange animate-pulse shrink-0" />
               <p className="text-[11px] font-bold text-zinc-600 truncate">Waiting for delivery partner...</p>
             </div>
          )}
        </div>
      )}
    </>
  );
}
