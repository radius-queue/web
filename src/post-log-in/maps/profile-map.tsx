import React, {useState} from 'react';
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

const Pin = (props: {lat: number, lng: number}) => {
  return (<div>
    &#xf276;
  </div>);
};

export const ProfileMap = ({center, radius, buildingLocation} : MapProps) => {
  const [mapCenter, setMapCenter] = useState<Coordinates>(center);
  const [bulding, setBuilding] = useState<Coordinates>(buildingLocation);
  const [fence, setFence] = useState<number>(radius);

  const renderMarker = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: buildingLocation,
      map,
      title: 'Hello World!',
    });
    return marker;
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{key: 'AIzaSyDBblrLk1wekXnzrIN9baw4Wz-WcI8s7Tc'}}
      defaultCenter={center}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps, ref}) => renderMarker(map, maps)}
    >
    </GoogleMapReact>
  );
};
