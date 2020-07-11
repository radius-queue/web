import React, {useEffect} from 'react';
import Form from 'react-bootstrap/Form';

interface AutocompleteProps {
  onChange: (val: string) => void;
  isValid: boolean;
  isInvalid: boolean;
  setCenter: (coords: google.maps.LatLng) => void;
  editable: boolean,
  value: string,
}

export const AddressAutocomplete = ({onChange, isValid, isInvalid, setCenter, editable, value}: AutocompleteProps) => {
  let autocompleteObject : google.maps.places.Autocomplete;
  const didMount = () => {
    autocompleteObject = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
    );

    autocompleteObject.setFields(['geometry', 'formatted_address']);
    autocompleteObject.addListener('place_changed', () => selectValue(value));
  };

  const selectValue = (val: string) => {
    const result : google.maps.places.PlaceResult = autocompleteObject.getPlace();
    console.log(result);
    onChange(result.formatted_address!);
    setCenter(result.geometry!.location!);
  };

  useEffect(() => {
    if (editable) {
      didMount();
    }
  }, []);

  return (
    <Form.Group>
      <Form.Label>Address</Form.Label>
      <Form.Control
        type="text"
        name="address"
        id='autocomplete'
        placeholder="555 Example Dr."
        value={value}
        isInvalid={isInvalid}
        isValid={isValid}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        readOnly={!editable}
      />
      <Form.Control.Feedback type='invalid'>
        Please Enter a Location Address
      </Form.Control.Feedback>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddressAutocomplete;
