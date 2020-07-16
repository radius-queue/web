import React, {useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';

interface AutocompleteProps {
  onChange: (val: string) => void;
  isValid: boolean;
  isInvalid: boolean;
  setCenter: (coords: google.maps.LatLng) => void;
  editable: boolean,
  value: string,
}

export const AddressAutocomplete = ({onChange, isValid, isInvalid, setCenter,
  editable, value}: AutocompleteProps) => {
  const [state, setState] = useState<string>(value);
  const autocompleteObject = useRef<google.maps.places.Autocomplete | undefined>(undefined);

  useEffect(() => {
    setState(value);
  }, [value]);

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < state.length) {
      onChange('');
    };
    setState(e.target.value);
  };

  useEffect(() => {
    if (editable) {
      autocompleteObject.current = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement,
      );

      autocompleteObject.current.setFields(['geometry', 'formatted_address']);
      autocompleteObject.current.addListener('place_changed', () => selectValue(state));
      console.log('called');
    }
  }, [editable]);

  const selectValue = (val: string) => {
    const result : google.maps.places.PlaceResult =
      autocompleteObject.current!.getPlace();
    onChange(result.formatted_address!);
    setState(result.formatted_address!);
    setCenter(result.geometry!.location!);
  };

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
