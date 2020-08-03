// eslint-disable-next-line no-unused-vars
import {Party, Queue} from './queue';
// eslint-disable-next-line no-unused-vars
import {Business} from './business';

const ROOT_URL : string = 'https://us-central1-ahead-9d906.cloudfunctions.net/widgets';

/**
 * This function retreives the business information
 * of the entity with the given uid.
 *
 * @param {string} uid the id of the business
 * @return {Business | undefined} the result of the query, either the
 * business object or undefined if it did not exist.
 * @throws {Error} if the connection with Firestore is severed
 */
export const getBusiness = async (uid: string) => {
  const response = await fetch(`${ROOT_URL}/api/businesses?uid=${uid}`);
  if (response.status === 500) {
    throw new Error('Problem Connecting to Firestore');
  }
  if (response.status === 404) { // no business found
    return undefined;
  }
  const value = await response.json();
  value.locations[0].hours = value.locations[0].hours.map(
      (val: [string | null, string | null]) => hoursFromAPI(val),
  );
  return value;
};

/**
 * This function retreives the queue information
 * of the entity with the given uid.
 *
 * @param {string} uid the id of the queue
 * @return {Promise<Queue | undefined>} the result of the query, either the
 * queue object or undefined if it did not exist.
 * @throws {Error} if the connection with Firestore is severed
 */
export const getQueue = async (uid: string): Promise<Queue | undefined> => {
  const response = await fetch(`${ROOT_URL}/api/queues?uid=${uid}`);
  if (response.status === 500) { // error on server (status === 500)
    // This would be a very big problem, will want the user
    // to refresh the page
    throw new Error('Problem Connecting to Firestore');
  }
  if (response.status === 404) { // queue doesn't exist, shouldn't happen
    return undefined;
  }
  const value = await response.json();
  value.parties = value.parties.map((val : any) => partyFromAPI(val));
  return value;
};

/**
 * This function posts the given business to Firestore
 *
 * @param {Business} business the business to be posted
 * @throws {Error} if the connection with Firestore is severed or
 * the business object is missing properties (both should not occur)
 */
export const postBusiness = async (business: Business) => {
  const body = {business};
  const response = await fetch(`${ROOT_URL}/api/businesses`, postOptions(body));
  if (response.status === 400) {
    throw new Error('Malformed Request');
  }
  if (response.status === 500) {
    throw new Error('Problem Connecting to Firestore');
  }
};

/**
 * This function posts the given queue to Firestore
 *
 * @param {Queue} queue the queue to be posted
 * @throws {Error} if the connection with Firestore is severed or
 * the queue object is missing properties (both should not occur)
 */
export const postQueue = async (queue : Queue) => {
  const body = {queue};
  console.log(body);
  const response = await fetch(`${ROOT_URL}/api/queues`, postOptions(body));
  if (response.status === 400) {
    throw new Error('Malformed Request');
  }
  if (response.status === 500) {
    throw new Error('Problem Connecting to Firestore');
  }
};

/**
 * This function creates a new queue and posts it to Firestore. A
 * new queue has default values for parties and open. The created
 * queue is returned.
 *
 * @param {string} uid the uid of the queue to be made
 * @param {string} name the name of the queue to be created
 * @throws {Error} if the connection with Firestore is severed
 */
export const newQueue = async (uid: string, name: string) : Promise<Queue> => {
  const response = await fetch(
      `${ROOT_URL}/api/queues/new?uid=${uid}&name=${name}`,
      {
        method: 'POST',
      },
  );

  if (response.status === 500) {
    throw new Error('Problem Connecting to Firebase');
  }

  return await response.json();
};

const postOptions = (body: any) => (
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
);

const hoursFromAPI = (val: [string | null, string | null]) => {
  return [
    val[0] ? new Date(val[0]) : val[0],
    val[1] ? new Date(val[1]) : val[1],
  ];
};

const partyFromAPI : (val: any) => Party = (val : any) => {
  return {
    ...val,
    messages: val.messages.map(
        (val: [string, string]) => [new Date(val[0]), val[1]],
    ),
    checkIn: new Date(val.checkIn),
  };
};
