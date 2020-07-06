import {Queue, queueConverter} from './queue';
import {firestore} from '../firebase';

/**
 * @param uid
 */
export default function getQueue(uid : string) {
  firestore.collection('queues').doc(uid)
      .withConverter(queueConverter)
      .get().then(function(doc) {
        if (doc.exists) {
          const q: Queue | undefined = doc.data();
          // Use a City instance method
          console.log(q);
          return q;
        } else {
          console.log('No such document!');
        }
      }).catch(function(error) {
        console.log('Error getting document:', error);
      });
}


