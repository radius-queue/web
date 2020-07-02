import {Queue, Party} from './Queue';

export const TEST_QUEUE : Queue = new Queue('Test', undefined,
    [1, 2, 3].map((val) => new Party(val.toString(), val, val.toString(), val)));
