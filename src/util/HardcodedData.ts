import {Queue, Party} from './queue';

export const TEST_QUEUE : Queue = new Queue('Test', undefined,
    [1, 2, 3].map((val) => new Party(val.toString(), val, val.toString(), val)));
