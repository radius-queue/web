import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';

interface AutocompleteProps {
  onChange: (val: string) => void;
  isValid: boolean;
  isInvalid: boolean;
}

export const AddressAutocomplete = ({onChange, isValid, isInvalid}: AutocompleteProps) => {
  let autocompleteObject : google.maps.places.Autocomplete;
  const [value, setValue] = useState<string>('');

  const afterLoad = () => {
    autocompleteObject = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
    );

    autocompleteObject.setFields(['address']);
    autocompleteObject.addListener('place_changed', () => selectValue(value));
  };

  const selectValue = (val: string) => {
    const result : google.maps.places.PlaceResult = autocompleteObject.getPlace();
    onChange(result.name!);
    changeValue(result.name!);
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