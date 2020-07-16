import React from 'react';
import Card from 'react-bootstrap/Card';
import GoogleMapReact from 'google-map-react';
import GOOGLE_API_KEY from '../../google-key';
import PropTypes from 'prop-types';
import { UW_MAP_PROPS } from '../../util/HardcodedData';

export interface MapProps {
  radius: number, // radius of their geofence in meters
  buildingLocation: google.maps.LatLng | undefined, // coordinates of business location
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

    map.setMapTypeId('satellite');

    if (editable) {
      google.maps.event.addListener(circleObject, 'radius_changed', () => {
        setRadius(circleObject.getRadius());
      });
    }
  };


  return (
    buildingLocation ?
      <GoogleMapReact
        bootstrapURLKeys={{key: GOOGLE_API_KEY}}
        center={{lng: buildingLocation!.lng(), lat: buildingLocation!.lat()}}
        defaultZoom={17}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps, ref}) => renderMarker(map)}
        key={buildingLocation.toString() + `${editable}`}
      /> :
      (<Card.Body id='loading-profile-container'>
        <Card.Title id='loading-profile-title'>
          Welcome to Radius! A map of your business location will appear here upon entering your business address.
        </Card.Title>
        <img id='loading-profile-logo' src='../../images/radius-logo.PNG' alt='Radius Logo' />
      </Card.Body>)
  );
};

Map.propTypes = {
  radius: PropTypes.element,
  buildingLocation: PropTypes.element,
  setRadius: PropTypes.element,
  editable: PropTypes.element,
};

export default Map;
