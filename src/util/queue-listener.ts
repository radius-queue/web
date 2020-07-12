import {firestore} from '../firebase';
import {queueConverter, Queue} from './queue';

/**
 *
 */
export class QueueListener {
  listener: () => void;

  /**
   *
   * @param uid
   * @param kickback
   */
  constructor(uid: string, kickback: (q: any) => void) {
    console.log('here');
    this.listener = firestore.collection('queues').doc(uid)
        .withConverter(queueConverter)
        .onSnapshot(function(doc) {
          if (doc.exists) {
            // kickback(doc);
            console.log(doc.data());
          } else {
            console.log('No such document!');
          }
        }, function(error) {
          console.log('Error getting document:', error);
        });
  }

  /**
   *
   */
  free(): void {
    console.log('free');
    this.listener();
  }
}
