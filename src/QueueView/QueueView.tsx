import React, {useState} from 'react';
import {Queue, Party} from '../util/Queue';
import Card from 'react-bootstrap/Card';

interface ListProps {
    queue: Queue
}

export const QueueList = ({queue} : ListProps) => {
  const [partyList, setPartyList] = useState(queue.parties);

  return (<div>
    {partyList.map((person: Party, idx: number) =>
      (<Card key={person.name}>
        {person.toString()}
      </Card>))}
  </div>)
};
