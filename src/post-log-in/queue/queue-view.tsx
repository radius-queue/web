import React, {useState, useEffect, useRef} from 'react';
import {Queue, Party} from '../../util/queue';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {AddCustomerModal, DeleteCustomerModal,
  ClearModal} from './queue-modals';
import postQueue from '../../util/post-queue';
import {QueueListener} from '../../util/queue-listener';
import UserCard from './queue-card';
import QueueList from './queue-list';
import QueueControls from './queue-controls';
import './queue-view.css';


interface ViewProps {
  queue: Queue,
  setQueue: (q :Queue) => void,
}

/**
 * The container for all queue Cards and Modals.
 * @param {ViewProps} ViewProps The given queue with access to editing.
 * @return {jsx} A React Boostrap container containing every Card and Modal
 * on the queue-view page.
 */
const QueueView = ({queue, setQueue} : ViewProps) => {
  const [stateQ, setQ] = useState<Queue>(queue);
  const currentQRef = useRef<Queue | undefined>();
  const currentPartyRef = useRef<[Party, number] | undefined>();
  const [party, setParty] = useState<[Party, number] | undefined>();
  const [time, setTime] = useState<Date>(new Date());
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [clearModal, setClearModal] = useState<boolean>(false);

  useEffect(()=> {
    const listener = new QueueListener(queue.uid, (newQ: Queue) => {
      setQ(newQ);

      const includes = () => {
        let result : [boolean, number] = [false, -1];
        if (currentPartyRef.current) {
          newQ.parties.forEach((val: Party, idx: number) => {
            if (val.name === currentPartyRef.current![0].name && val.phoneNumber === currentPartyRef.current![0].phoneNumber) {
              result = [true, idx];
            }
          });
        }
        return result;
      };
      const includesResult : [boolean, number] = includes();
      if (newQ.parties.length === 0 || !includesResult[0]) {
        setParty(undefined);
      } else {
        setParty([currentPartyRef.current![0], includesResult[1]]);
      }
    });

    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => {
      if (listener) {
        listener!.free();
      }
      if (currentQRef.current) {
        setQueue(currentQRef.current);
      }
      clearInterval(interval);
    };
  }, [setQueue, queue.uid]);

  useEffect(() => {
    currentQRef.current = stateQ;
  }, [stateQ]);

  useEffect(() => {
    currentPartyRef.current = party;
  }, [party]);

  /**
   * Adds the given party at the bottom of the current queue.
   * @param {Party} party The party to be added to the queue.
   */
  const addParty = (party: Party) => {
    const list: Party[] = stateQ!.parties.slice();
    list.push(party);
    const newQueue : Queue =
      new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, list);
    setQ(newQueue);
    postQueue(newQueue);
  };

  /**
   * Removes the given party from the current queue.
   * @param {Party} party The party to be removed from the queue.
   */
  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);
    const newQ: Queue =
      new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, list);
    setQ(newQ);
    setParty(undefined);
    postQueue(newQ);
  };

  /**
   * Clears all parties from the current queue.
   */
  const clearQueue = () => {
    const newQ: Queue =
      new Queue(stateQ.name, stateQ.end, stateQ.uid, stateQ.open, []);
    setQ(newQ);
    setParty(undefined);
    postQueue(newQ);
  };

  return (
    <Container>
      <QueueControls
        queue={stateQ}
        clear={() => setClearModal(true)}
        setQueue={(q: Queue) => setQ(q)}
      />
      <QueueList queue={stateQ}
        showParty={setParty}
        setQueue={setQ}
        showAddModal={() => setAddModal(true)}
        showDeleteModal={() => setDeleteModal(true)}
        currentPartyInfo={party}
        time={time}
      />
      <UserCard party={party ? party[0] : party} time={time}/>
      <AddCustomerModal
        show={addModal}
        close={() => setAddModal(false)}
        mainAction={(p : Party) => addParty(p)}
      />
      <DeleteCustomerModal
        show={deleteModal}
        close={() => setDeleteModal(false)}
        mainAction={(p: Party) => removeParty(p)}
        party={party ? party[0] : party}
      />
      <ClearModal
        show={clearModal}
        close={() => setClearModal(false)}
        clear={clearQueue}
      />
    </Container>
  );
};

QueueView.propTypes = {
  queue: PropTypes.object,
  setQueue: PropTypes.func,
};

export default QueueView;