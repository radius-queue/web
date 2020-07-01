import React, { useState } from 'react';

export const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);

  return [
    state,
    (e: React.ChangeEvent<InputEvent>) => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
  ]
}