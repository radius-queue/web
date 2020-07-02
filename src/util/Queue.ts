/**
 * This class represents a queue
 */
export class Queue {
  name : string;
  parties: Party[]; // where parties[0] is the front of the line
  end: Date | undefined;
  // uid : string;

  /**
   * @param {string} name Name of Queue
   * @param {Date} end End time
   * @param {Party[]} parties Optional field for initializing current queue,
   *    Default value is set to empty array
   */
<<<<<<< HEAD:src/util/Queue.ts
  constructor(name?: string, end?: Date, parties?: Party[]) {
    this.name = name ||'';
    this.parties = parties ? parties : [];
=======
  constructor(name: string, end: Date, parties: Party[] = []) {
    this.name = name ||'';
    this.parties = parties;
>>>>>>> f5a95cb02f1d23d93bf7896e8aec4ab6ace5dec9:src/util/Queue.tsx
    this.end = end;
    // this.uid = uid || "";
  }

  /**
   * Adds a party to the end of the queue
   * @param {string} name Name of the Party
   * @param {number} size Size of the party
   * @param {string} phoneNumber phoneNumber of the party
   * @param {number} quote The given estimated time to be called
   */
  addParty(name: string, size: number, phoneNumber: string, quote:number) {
    this.parties.push(new Party(name, size, phoneNumber, quote));
  }
}

/**
 * A party in the queue
 */
export class Party {
  name: string;
  checkIn : Date;
  size: number;
  phoneNumber: string;
  quote: number;
  // uid: string;

  /**
   * @param {string} name Name of the Party
   * @param {number} size Size of the party
   * @param {string} phoneNumber phoneNumber of the party
   * @param {number} quote The given estimated time to be called
   */
  constructor(name: string, size: number, phoneNumber: string,
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
