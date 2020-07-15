import {useEffect, useState} from 'react';
import {Queue, Party} from '../util/queue';
import getQueue from '../util/get-queue';
import React from 'react';
import { QueueURLParamViewer } from '../post-log-in/queue-view';


const QueueURLViewer = () => {
  const [isQueueLoading, setQueueLoading] = useState<boolean>(true);
  const [queue, setQueue] = useState<Queue | undefined>(undefined);
  const [party, setParty] = useState<Party | undefined>(undefined);
  const [phoneNum, setPhoneNum] = useState<string>('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has('queue') || !urlParams.has('phoneNumber')) {
      window.location.href = '/404';
    } else {
      setPhoneNum(urlParams.get('phoneNumber')!);
      queryForQueue(urlParams.get('queue')!);
    }
  }, []);

  useEffect(() => {
    if (queue) {
      queue.parties.map((p: Party) =>{
        if (p.phoneNumber === phoneNum) {
          setParty(p);
        }
      });
      if (party) {
        console.log('error in getting current party based on phoneNumber');
      }
      setQueueLoading(false);
    }
  }, [queue]);

  const queryForQueue = async (uid: string) => {
    const val : Queue | undefined = await getQueue(uid);
    setQueue(val);
  };

  return (isQueueLoading) ?
    <div>loading</div> :
    <QueueURLParamViewer queue={queue!} party={party}/>;
};

// Example:
// http://localhost:3000/url-based-queue/?queue=sample-queue1&phoneNumber=1

export default QueueURLViewer;
