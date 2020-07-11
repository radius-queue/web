import {useState} from 'react';

/**
 * Hook for updating form fields. Takes in the initial
 * state for the input fields (note that your input fields
 * should have a 'name' property that correspond to fields
 * within your state object). For example, if your state looked
 * like:
 *         {
 *          value: "Some value"
 *         }
 * you should have at least one input that looks like:
 *     <input name="value" type='text' ... />
 *
 * Refer to the video on React hooks "useState" in
 * our chat for more information.
 *
 * @param {any} initialState
 * @return {any}
 * */
export const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);

  return [
    state,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    },
    (newState: any) => {
      setState({
        ...newState,
      });
    },
  ];
};
