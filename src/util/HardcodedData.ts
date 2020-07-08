import {Queue, Party} from './queue';
import {MapProps} from '../post-log-in/maps/profile-map';

const TEST_PARTY : Party[] = [new Party('Russell Wilson', 3, '123-456-789', 20),
  new Party('Serena Williams', 2, '987-654-3210', 45),
  new Party('Tiger Woods', 10, '151-515-1515', 60)];

export const TEST_QUEUE : Queue = new Queue('Test', new Date(), '0', TEST_PARTY);

export const UW_MAP_PROPS : MapProps = {
  center: {
    lat: 47.655548,
    lng: -122.303200,
  },
  buildingLocation: {
    lat: 47.655548,
    lng: -122.303200,
  },
  radius: 1000,
};
