// this class represents a queue
export class Queue {
  name : string;
  parties: Party[];
  end: Date | undefined;
  // uid : string;

  constructor(name?: string, end?: Date){
      this.name = name ||"";
      this.parties = [];
      this.end = end;
      // this.uid = uid || "";
  }

  addParty(name?: string, size?: number, phoneNumber?: number, quote? :number){
    this.parties.push(new Party(name, size, phoneNumber, quote));
  }
}

class Party {
  name: string;
  checkIn : Date;
  size: number;
  phoneNumber: number;
  quote: number; // quote of wait time given to party in min
  //uid: string;

  constructor(name?: string, size?: number, phoneNumber?: number, quote? :number){
    this.name = name ||"";
    this.checkIn = new Date();
    this.size = size || -1;
    this.phoneNumber = phoneNumber || -1;
    this.quote = quote || -1;
    //this.uid = uid || "";
  }

}

// ** TODO: impliment uid once database up