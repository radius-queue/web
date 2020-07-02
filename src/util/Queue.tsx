/**
 * This class represents a queue
 */
export class Queue {
  /**
   * @param {string} name Name of the queue
   * @param {Party[]} parties Order list of all parties such that lower index
   *    implies earlier in queue
   * @param {Date} end Time at which the queue ends
   */
  name : string;
  parties: Party[];
  end: Date | undefined;
  // uid : string;

  /**
   * @param {string} name Name of Queue
   * @param {Date} end End time
   * @param {Party[]} parties Optional field for initializing current queue,
   *    Default value is set to empty array
   */
  constructor(name: string, end: Date, parties: Party[] = []) {
    this.name = name ||'';
    this.parties = parties;
    this.end = end;
    // this.uid = uid || "";
  }

  /**
   * Adds a party to the end of the queue
   * @param {string} name Name of the Party
   * @param {number} size Size of the party
   * @param {number} phoneNumber phoneNumber of the party
   * @param {number} quote The given estimated time to be called
   */
  addParty(name: string, size: number, phoneNumber: number, quote:number) {
    this.parties.push(new Party(name, size, phoneNumber, quote));
  }
}

/**
 * A party in the queue
 */
export class Party {
  /**
   * @param {string} name Name of the Party
   * @param {Date} checkIn Time of check in
   * @param {number} size Size of the party
   * @param {number} phoneNumber phoneNumber of the party
   * @param {number} quote The given estimated time to be called
   */
  name: string;
  checkIn : Date;
  size: number;
  phoneNumber: number;
  quote: number;
  // uid: string;

  /**
   * @param {string} name Name of the Party
   * @param {number} size Size of the party
   * @param {number} phoneNumber phoneNumber of the party
   * @param {number} quote The given estimated time to be called
   */
  constructor(name: string, size: number, phoneNumber: number,
      quote:number) {
    this.name = name;
    this.checkIn = new Date();
    this.size = size;
    this.phoneNumber = phoneNumber;
    this.quote = quote;
    // this.uid = uid || "";
  }
}

// ** TODO: impliment uid once database up
