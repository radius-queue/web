import firebase from 'firebase/app';
/**
 * This class represents a Business
 */
export class Business {
  name: string;
  firstName: string;
  lastName:string;
  email: string;
  locations: BusinessLocation[];
  // password : string;
  uid : string;

  /**
   * @param {string} name Business name
   * @param {string} firstName Owner First Name
   * @param {string} lastName Owner Last Name
   * @param {string} email Account email
   * @param {string} uid Unique Identifier
   * @param {BusinessLocation[]} locations Optional array of store location
   *    objects, Default value is set to be empty array
   */
  constructor(name: string, firstName: string, lastName: string, email: string,
      uid: string, locations: BusinessLocation[] =[]) {
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.uid = uid;
    this.locations = locations;
    // this.uid = uid || "";
  }
}

/**
 * A specific business location
 */
export class BusinessLocation {
  name: string;
  address: string;
  hours: [Date, Date][];
  coordinates: number[]; // in decimal degrees (DD).
  queues: string[];
  geoFenceRadius: number; // in meters

  /**
   * @param {string} name Name of specific location
   * @param {string} address Address of location
   * @param {[Date, Date][]} hours business hours for queue operation as array
   *    of Date object pairs.
   * @param {number[]} coordinates Geographic coordinates of location in
   *    decimal degrees (DD). ex: [41.40338, 2.17403] lat, long
   * @param {string[]} queues Optional array of queue ids associated with
   *    this location, Default value of empty array
   * @param {number} geoFenceRadius Optional radius around business location
   *    (in meters) that a customer is allowed to enter queue, Default value
   *    of -1
   */
  constructor(name: string, address: string, hours: [Date, Date][],
      coordinates: number[], queues: string[] = [],
      geoFenceRadius: number = -1) {
    this.name = name;
    this.address = address;
    this.hours = hours;
    this.coordinates = coordinates;
    this.queues = queues;
    this.geoFenceRadius = geoFenceRadius;
  }

  /**
  * @param party
  */
  static fromFirebase(location: any): BusinessLocation {
    const locPrams : [string, string, [Date, Date][], number[],
     string[], number] = [
       location.name,
       location.address,
       BusinessLocation.hoursFromFirebase(location.hours),
       [location.coordinates.getLatitude(),
         location.coordinates.getLongitude()],
       location.queues,
       location.geoFenceRadius,
     ];
    return new BusinessLocation(...locPrams);
  }

  /**
  * @param party
  */
  static toFirebase(location: BusinessLocation): any {
    return {
      name: location.name,
      address: location.address,
      hours: BusinessLocation.hoursToFirebase(location.hours), // need fixing
      coordinates: new firebase.firestore.GeoPoint(
          location.coordinates[0],
          location.coordinates[1],
      ),
      queues: location.queues,
      geoFenceRadius: location.geoFenceRadius,
    };
  }

  /**
   *
   * @param hours
   */
  static hoursToFirebase(hours: [Date, Date][]): any {
    const ret: {[id:string]: [Date, Date]} = {};
    for (let i = 0; i < DATE_INDEX.size; i++) {
      const day = hours[i];
      const dayName: string = DATE_INDEX.get(i)!;
      ret[dayName] = [day[0], day[1]];
    }
    return ret;
  }

  /**
   *
   * @param hours
   */
  static hoursFromFirebase(hours: any): [Date, Date][] {
    const ret: [Date, Date][] = [];
    for (let i = 0; i < DATE_INDEX.size; i++) {
      const day = hours.get(DATE_INDEX.get(i));
      ret.push([day[0].toDate(), day[1].toDate()]);
    }
    return ret;
  }
}

const DATE_INDEX: Map<number, string> = new Map<number, string>([
  [0, 'Sunday'],
  [1, 'Monday'],
  [2, 'Tuesday'],
  [3, 'Wednesday'],
  [4, 'Thursday'],
  [5, 'Friday'],
  [6, 'Saturday'],
]);

