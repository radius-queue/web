import {firestore} from '../firebase';
import {businessConverter, Business} from './business';

/**
 *
 * @param b
 */
export default function postBusiness(b : Business) {
  firestore.collection('businesses').doc(b.uid)
      .withConverter(businessConverter)
      .set(b);
}
