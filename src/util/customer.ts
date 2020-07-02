/**
 * This class represnets a customer
 */
export class Customer {
  name: string;
  email: string;
  phoneNumber: string;
  currentQueue: string;

  /**
   * @param {string[]} name Customer Name [First, Last]
   * @param {string} email Customer email
   * @param {string} phoneNumber Customer phone number
   * @param {string} currentQueue Optional ID of queue that customer is in,
   *    Default of ""
   */
  constructor(name: string, email: string, phoneNumber: string,
      currentQueue: string = '') {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.currentQueue = currentQueue;
  }
}
