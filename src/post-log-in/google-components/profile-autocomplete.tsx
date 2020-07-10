import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';

interface AutocompleteProps {
  onChange: (val: string) => void;
  isValid: boolean;
  isInvalid: boolean;
  setCenter: (coords: google.maps.LatLng) => void;
}

export const AddressAutocomplete = ({onChange, isValid, isInvalid, setCenter}: AutocompleteProps) => {
  let autocompleteObject : google.maps.places.Autocomplete;
  const [value, setValue] = useState<string>('');

  const afterLoad = () => {
    autocompleteObject = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
    );

    autocompleteObject.setFields(['geometry', 'formatted_address']);
    autocompleteObject.addListener('place_changed', () => selectValue(value));
  };

  const selectValue = (val: string) => {
    const result : google.maps.places.PlaceResult = autocompleteObject.getPlace();
    console.log(result);
    changeValue(result.formatted_address!);
    onChange(result.formatted_address!);
    setCenter(result.geometry?.location!);
  };

  const changeValue = (e: string) => {
    let newVal: string;
    if (e.length < value.length) {
      newVal = '';
      onChange(newVal);
    } else {
      newVal = e;
    }
    setValue(newVal);
  };

  useEffect(() => {
    afterLoad();
  });

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValue(e.target.value)}
      />
      <Form.Control.Feedback type='invalid'>
        Please Enter a Location Address
      </Form.Control.Feedback>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddressAutocomplete;
