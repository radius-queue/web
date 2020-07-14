import {useEffect, useState} from 'react';
import {Queue, Party} from '../util/queue';
import getQueue from '../util/get-queue';
import React from 'react';
import { QueueURLParamViewer } from '../post-log-in/queue-view';


const QueueURLViewer = () => {
  const [isQueueLoading, setQueueLoading] = useState<boolean>(true);
  let queue : Queue | undefined = undefined;
  let party : Party | undefined = undefined;
  let phoneNumber : string = '';
  let queueUid : string = '';

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has('queue') || !urlParams.has('phoneNumber')) {
      window.location.href = '/404';
    } else {
      queueUid = urlParams.get('queue')!;
      phoneNumber = urlParams.get('phoneNumber')!;
      queryForQueue();
    }
  }, []);

  useEffect(() => {
    setQueueLoading(false);
    if (queue) {
      queue.parties.map((p: Party) =>{
        if (p.phoneNumber == phoneNumber) {
          party = p;
        }
      });
      if (party) {
        console.log('error in getting current party based on phoneNumber');
      }
    }
  }, [queue]);

  const queryForQueue = async () => {
    queue = await getQueue(queueUid);
  };

  return (isQueueLoading) ?
    <div>loading</div> :
    <QueueURLParamViewer queue={queue!} party={party}/>;
};

export default QueueURLViewer;
