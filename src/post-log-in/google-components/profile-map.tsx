import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import GOOGLE_API_KEY from '../../google-key';

interface Coordinates {
  lat: number,
  lng: number,
}

export interface MapProps {
  center: google.maps.LatLng, // coordinates of the center of the circle
  radius: number, // radius of their geofence in meters
  buildingLocation: Coordinates, // coordinates of business location
}

const Map = ({center, radius, buildingLocation} : MapProps) => {
  const [currentCenter, setCenter] = useState<google.maps.LatLng>(center);
  const [currentRadius, setRadius] = useState<number>(radius);

  const renderMarker = (map: any) => {
    const marker = new google.maps.Marker({
      position: buildingLocation,
      map,
      title: 'Hello World!',
    });

    const circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      map,
      center: center,
      radius: radius,
      editable: true,
      draggable: true,
    });

    google.maps.event.addListener(circle, 'radius_changed', () => {
      setRadius(circle.getRadius());
    });

    google.maps.event.addListener(circle, 'center_changed', () => {
      setCenter(circle.getCenter());
    });
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{key: GOOGLE_API_KEY}}
      defaultCenter={{lng: center.lng(), lat: center.lat()}}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps, ref}) => renderMarker(map)}
    />
  );
};

export default Map;
