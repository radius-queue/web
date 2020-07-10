import {Customer, customerConverter} from './customer';
import { firestore } from '../firebase';

/**
 *
 * @param c
 */
export default function postCustomer(c : Customer) {
  firestore.collection('customer').doc(c.uid)
      .withConverter(customerConverter)
      .set(c);
}
