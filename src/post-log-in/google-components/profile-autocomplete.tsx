import React, {useEffect, useState} from 'react';
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
  const [state, setState] = useState<string>(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  let autocompleteObject : google.maps.places.Autocomplete;
  const didMount = () => {
    autocompleteObject = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
    );

    autocompleteObject.setFields(['geometry', 'formatted_address']);
    autocompleteObject.addListener('place_changed', () => selectValue(state));
  };

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < state.length) {
      onChange('');
    };
    setState(e.target.value);
  };

  const selectValue = (val: string) => {
    const result : google.maps.places.PlaceResult = autocompleteObject.getPlace();
    onChange(result.formatted_address!);
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
        value={state}
        isInvalid={isInvalid}
        onChange={changeAddress}
        isValid={isValid}
        readOnly={!editable}
      />
      <Form.Control.Feedback type='invalid'>
        Please Enter a Location Address
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddressAutocomplete;
