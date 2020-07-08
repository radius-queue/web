import React from 'react';
import GoogleMapReact from 'google-map-react';

interface Coordinates {
  lat: number,
  lng: number,
}

export interface MapProps {
  center: Coordinates, // coordinates of the center of the circle
  radius: number, // radius of their geofence in meters
  buildingLocation: Coordinates, // coordinates of business location
}

export const ProfileMap = ({center, radius, buildingLocation} : MapProps) => {
  const renderMarker = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: buildingLocation,
      map,
      title: 'Hello World!',
    });

    const circle = new maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      map,
      center: center,
      radius: radius,
    });

    return [marker, circle];
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{key: 'AIzaSyAmXeMZgo52LGxdxTOApHXrREv8eBdoB5c'}}
      defaultCenter={center}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps, ref}) => renderMarker(map, maps)}
    >
    </GoogleMapReact>
  );
};
