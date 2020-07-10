import {firestore} from '../firebase';
import {queueConverter, Queue} from './queue';

/**
 *
 * @param q
 */
export default function postQueue(q : Queue) {
  firestore.collection('queues').doc(q.uid)
      .withConverter(queueConverter)
      .set(q);
}
