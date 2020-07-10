import React from 'react';
import GoogleMapReact from 'google-map-react';
import GOOGLE_API_KEY from '../../google-key';

export interface MapProps {
  center: google.maps.LatLng, // coordinates of the center of the circle
  radius: number, // radius of their geofence in meters
  buildingLocation: google.maps.LatLng, // coordinates of business location
  setRadius: (rad: number) => void,
  setCenter: (point: google.maps.LatLng) => void,
}

const Map = ({center, radius, buildingLocation, setRadius, setCenter} : MapProps) => {
  const renderMarker = (map: any) => {
    new google.maps.Marker({
      position: buildingLocation,
      map,
      title: 'Hello World!',
    });

    const circleObject = new google.maps.Circle({
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

    google.maps.event.addListener(circleObject, 'radius_changed', () => {
      setRadius(circleObject.getRadius());
    });

    google.maps.event.addListener(circleObject, 'center_changed', () => {
      setCenter(circleObject.getCenter());
    });
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{key: GOOGLE_API_KEY}}
      center={{lng: center.lng(), lat: center.lat()}}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps, ref}) => renderMarker(map)}
      key={buildingLocation.toString()}
    />
  );
};

export default Map;
