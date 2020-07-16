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

/**
* Calculates the time difference in minutes betweeen two Date objects.
* @param {Date} t1 The most current time.
* @param {Date} t2 The oldest time.
* @return {boolean} the time difference in minutes
*/
export const timeDiffInMinutes = (t1: Date, t2: Date) => {
  const result : number = Math.round((t1.getTime() - t2.getTime()) / 60000);
  return result === -1 ? 0 : result;
};
