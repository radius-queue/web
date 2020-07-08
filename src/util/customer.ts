/**
 * This class represnets a customer
 */
export class Customer {
  firstName: string;
  lastName:string;
  email: string;
  phoneNumber: string;
  uid: string;
  currentQueue: string;

  /**
   * @param {string} firstName Customer First Name
   * @param {string} lastName Customer Last Name
   * @param {string} email Customer email
   * @param {string} phoneNumber Customer phone number
   * @param {string} uid Customer unique identifier
   * @param {string} currentQueue Optional ID of queue that customer is in,
   *    Default of ""
   */
  constructor(firstName: string, lastName: string, email: string,
      phoneNumber: string, uid: string,
      currentQueue: string = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.uid = uid;
    this.currentQueue = currentQueue;
  }
}

export const customerConverter = {
  toFirestore: function(c: Customer) {
    return {
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phoneNumber: c.phoneNumber,
      currentQueue: c.currentQueue,
    };
  },
  fromFirestore: function(snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new Customer(
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNumber,
        '', // uid
        data.currentQueue,
    );
  },
};
