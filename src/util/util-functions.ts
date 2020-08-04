/**
 * Parser for displaying phone numbers
 * @param {string} phoneNum
 * @return {string} parsed phone number
 */
export function parsePhoneNum(phoneNum : string) : string {
  if (phoneNum.length <= 3) {
    return phoneNum;
  } else {
    phoneNum = '(' + phoneNum.substring(0, 3) + ')' + phoneNum.substring(3);
  }

  if (phoneNum.length > 8) {
    phoneNum = phoneNum.substring(0, 8) + '-' + phoneNum.substring(8);
  }
  return phoneNum;
}

/**
 * Parses Name for customer side display
 * @param {string} firstName first name of customer
 * @param {string} lastName last name of customer
 * @return {string} display name
 */
export function parseShortName(firstName: string, lastName: String) : string {
  if (lastName.length < 1) {
    return firstName.substring(0, 1).toUpperCase();
  }
  return firstName.substring(0, 1).toUpperCase() + ' ' +
      lastName.substring(0, 1).toUpperCase();
}

const allNumbers: string[] =
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
   * Takes the user phone number input and sets the current phone
   * number state and the phone number display state.
   * Ensures that only numbers are inputted before setting states.
   * @param {string} next The phone number inputted by the user.
   * @return {ChangePhoneProps} The phone number numbers and the
   * phone number display. Empty strings if input not allowed.
   */
export const changePhone = (next: string): ChangePhoneProps => {
  const isAllNumbers: boolean = true;
  let strippedToNumbers: string = '';
  for (let i: number = 0; i < next.length; i++) {
    if (allNumbers.includes(next[i])) {
      strippedToNumbers += next[i];
    }
  }
  if (isAllNumbers && strippedToNumbers.length <= 10) {
    return (
      {
        numbers: strippedToNumbers,
        display: parsePhoneNum(strippedToNumbers),
      }
    );
  }
  return {numbers: '', display: ''};
};

export interface ChangePhoneProps {
  numbers: string,
  display: string,
};
