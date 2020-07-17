import React, {useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';

interface AutocompleteProps {
  onChange: (val: string) => void; // changes the top level state
  isValid: boolean; // if the input is in a valid state after submission
  isInvalid: boolean; // if the input is in an invalid state after submission
  setCenter: (coords: google.maps.LatLng) => void; // sets top level map center
  editable: boolean, // if the input should be editable
  value: string, // the intial value of the input
}

/**
 * Using the Google Maps Places API this function serves as the
 * Address input component for the profile page
 *
 * @param {AutocompleteProps} props properties passed into this
 * component
 * @return {jsx} the display for the Google Places Autocomplete
 * form input
 */
export const AddressAutocomplete = ({onChange, isValid, isInvalid, setCenter,
  editable, value}: AutocompleteProps) => {
  const [state, setState] = useState<string>(value);
  const autocompleteObject =
    useRef<google.maps.places.Autocomplete | undefined>(undefined);

  useEffect(() => {
    setState(value);
  }, [value]);

  /**
   * Callback function passed in to be called on selection
   * of an address from the Google Autocomplete Input.
   *
   * @param {string} val the value of the input element
   * on selection.
   */
  const selectValue = () => {
    const result : google.maps.places.PlaceResult =
      autocompleteObject.current!.getPlace();
    if (result) {
      onChange(result.formatted_address!);
      setState(result.formatted_address!);
      setCenter(result.geometry!.location!);
    } else {
      window.alert('There was an unforseen error with your request, please' +
        ' refresh the page and try again.');
    }
  };

  useEffect(() => {
    if (editable) {
      autocompleteObject.current = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement,
      );

      autocompleteObject.current.setFields(['geometry', 'formatted_address']);
      autocompleteObject.current.addListener(
          'place_changed',
          () => selectValue(),
      );
    }
  }, [editable]);

  /**
   * On change handler for the input element. This function ensures
   * that the top level state is only in a state of empty or a valid
   * Google autocomplete address.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e the event object
   * passed in on a change to the input element.
   */
  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < state.length) {
      onChange('');
    };
    setState(e.target.value);
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
