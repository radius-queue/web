import React, {useState, useEffect, useRef} from 'react';
import {Queue, Party} from '../../util/queue';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {
  AddCustomerModal,
  DeleteCustomerModal,
  ClearModal,
} from './queue-modals';
import {postQueue, pushNotifications} from '../../util/api-functions';
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
            if (val.firstName === currentPartyRef.current![0].firstName &&
                val.phoneNumber === currentPartyRef.current![0].phoneNumber) {
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
    const newQueue : Queue = new Queue(stateQ.uid, stateQ.open, list);
    postQueue(newQueue);
  };

  /**
   * Removes the given party from the current queue.
   * @param {Party} party The party to be removed from the queue.
   */
  const removeParty = (party: Party) => {
    const list: Party[] = stateQ.parties.filter((val) => val !== party);
    const newQ: Queue = new Queue(stateQ.uid, stateQ.open, list);
    setParty(undefined);
    postQueue(newQ);
  };

  /**
   * Sends a message to the current selected user
   * @param {string} message the message to be sent
   */
  const sendMessage = (message: string) => {
    const list = stateQ.parties.slice();
    party![0].messages.push([new Date(), message]);
    const newQ = new Queue(stateQ.uid, stateQ.open, list);
    postQueue(newQ);
    if (party![0].pushToken) {
      pushNotifications(message, [party![0].pushToken]);
    }
  };

  /**
   * Clears all parties from the current queue.
   */
  const clearQueue = () => {
    const newQ: Queue = new Queue(stateQ.uid, stateQ.open, []);
    setParty(undefined);
    postQueue(newQ);
  };

  return (
    <Container>
      <QueueControls
        queue={stateQ}
        clear={() => setClearModal(true)}
      />
      <QueueList queue={stateQ}
        showParty={setParty}
        showAddModal={() => setAddModal(true)}
        showDeleteModal={() => setDeleteModal(true)}
        currentPartyInfo={party}
        time={time}
      />
      <UserCard
        sendMessage={sendMessage}
        party={party ? party[0] : party}
        time={time}
      />
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
