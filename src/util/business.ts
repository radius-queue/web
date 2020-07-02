/**
 * This class represents a Business
 */
export class Business {
  name: string;
  ownerName: string[]; // [first, last]
  email: string;
  locations: BusinessLocation[];
  // password : string;
  // uid : string;

  /**
   * @param {string} name Business name
   * @param {string[]} ownerName Account owner name [first, last]
   * @param {string} email Account email
   * @param {BusinessLocation[]} locations Optional array of store location
   *    objects, Default value is set to be empty array
   */
  constructor(name: string, ownerName: string[], email: string,
      locations: BusinessLocation[] =[]) {
    this.name = name || '';
    this.ownerName = ownerName || '';
    this.email = email || '';
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
  geoFenceRadius: number; // in miles

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
   *    (in miles) that a customer is allowed to enter queue, Default value
   *    of -1
   */
  constructor(name: string, address: string, hours: [Date, Date][],
      coordinates: number[], queues: string[] = [],
      geoFenceRadius: number = -1) {
    this.name = name;
    this.address = address;
    this.hours = hours;
    this.coordinates = coordinates || [];
    this.queues = queues;
    this.geoFenceRadius = geoFenceRadius;
  }
}
