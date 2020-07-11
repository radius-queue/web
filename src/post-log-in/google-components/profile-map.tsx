import React from 'react';
import GoogleMapReact from 'google-map-react';
import GOOGLE_API_KEY from '../../google-key';

export interface MapProps {
  radius: number, // radius of their geofence in meters
  buildingLocation: google.maps.LatLng, // coordinates of business location
  setRadius: (rad: number) => void,
  editable: boolean,
}

const Map = ({radius, buildingLocation, setRadius, editable} : MapProps) => {
  const renderMarker = (map: any) => {
    new google.maps.Marker({
      position: buildingLocation,
      map,
    });

    const circleObject = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      map,
      center: buildingLocation,
      radius: radius,
      editable: editable,
      draggable: false,
    });

    if (editable) {
      google.maps.event.addListener(circleObject, 'radius_changed', () => {
        setRadius(circleObject.getRadius());
      });
    }
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{key: GOOGLE_API_KEY}}
      center={{lng: buildingLocation.lng(), lat: buildingLocation.lat()}}
      defaultZoom={17}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps, ref}) => renderMarker(map)}
      key={buildingLocation.toString() + `${editable}`}
    />
  );
};

export default Map;
