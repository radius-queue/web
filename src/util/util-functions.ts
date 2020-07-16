/**
 * Parser for displaying phone numbers
 * @param {string} phoneNum
 * @return {string} parsed phone number
 */
export function parsePhoneNum(phoneNum : string) : string {
  if (phoneNum.length < 3) {
    return phoneNum;
  } else {
    phoneNum = '(' + phoneNum.substring(0, 3) + ')' + phoneNum.substring(3);
  }

  if (phoneNum.length > 8) {
    phoneNum = phoneNum.substring(0, 8) + '-' + phoneNum.substring(8);
  }
  return phoneNum;
}
