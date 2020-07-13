import {firestore} from '../firebase';
import {queueConverter, Queue} from './queue';

/**
 *
 * @param {Queue} q Queue object to be updated on the database
 */
export default function postQueue(q : Queue) {
  console.log(q);
  firestore.collection('queues').doc(q.uid)
      .withConverter(queueConverter)
      .set(q);
}
