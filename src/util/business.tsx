/*
Business Name
Account Owner Name
Account Email
Account Password
Address Field
Hours of Operation
Phone Number

*/

/**
 * This class represents a Business
 */
export class Business {
  /**
   * @param {string} name Business name
   * @param {string} string Account owner name
   * @param {string} email Account email
   * @param {BusinessLocation[]} locations Array of store location objects
   */
  name: string;
  ownerName: string;
  email: string;
  locations: BusinessLocation[];
  // password : string;
  // uid : string;

  /**
   * @param {string} name Business name
   * @param {string} ownerName Account owner name
   * @param {string} email Account email
   * @param {BusinessLocation[]} locations Optional array of store location
   *    objects, Default value is set to be empty array
   */
  constructor(name: string, ownerName: string, email: string,
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
  /**
   * @param {string} name Name of specific location
   * @param {string} address Address of location
   * @param {number[]} coordinates Geographic coordinates of location in
   *    decimal degrees (DD). ex: [41.40338, 2.17403] lat, long
   * @param {string[]} queues Array of queue ids associated with this location
   * @param {number} geoFenceRadius Radius around business location (in miles)
   *    that a customer is allowed to enter queue
   */
  name: string;
  address: string;
  coordinates: number[];
  queues: string[];
  geoFenceRadius: number;

  /**
   * @param {string} name Name of specific location
   * @param {string} address Address of location
   * @param {number[]} coordinates Geographic coordinates of location in
   *    decimal degrees (DD). ex: [41.40338, 2.17403] lat, long
   * @param {string[]} queues Optional array of queue ids associated with
   *    this location, Default value of empty array
   * @param {number} geoFenceRadius Optional radius around business location
   *    (in miles) that a customer is allowed to enter queue, Default value
   *    of -1
   */
  constructor(name: string, address: string, coordinates: number[],
      queues: string[] = [], geoFenceRadius: number = -1) {
    this.name = name;
    this.address = address;
    this.coordinates = coordinates || [];
    this.queues = queues;
    this.geoFenceRadius = geoFenceRadius;
  }
}
