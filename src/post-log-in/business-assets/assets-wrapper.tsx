import React, {useState, useEffect} from 'react';
import AssetsPage from './assets';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import {Business} from '../../util/business';
import {DefaultQueuePage} from '../queue/queue-wrapper';

const AssetsLoadingPage = () => {
  return (<div>
    loading...
  </div>);
};

interface AssetsProps {
  uid: string;
  setBusiness: (b: Business) => void;
  business: Business | undefined | null;
}

const AssetsWrapper = ({uid, setBusiness, business} : AssetsProps) => {
  const [isBusinessLoading, setBusinessLoading] = useState<boolean>(true);
  const [isDefault, setDefault] = useState<boolean>(false);

  useEffect(() => {
    if (business !== null) {
      setBusinessLoading(false);
      if (business === undefined) {
        setDefault(true);
      } else {
        setDefault(false);
      }
    }
  }, [business]);

  return (isBusinessLoading) ?
    <AssetsLoadingPage/> :
      isDefault ?
      <DefaultQueuePage/>:
      <AssetsPage uid={uid} setBusiness={setBusiness} business={business}/>;
};

AssetsWrapper.propTypes = {
  business: PropTypes.object,
  uid: PropTypes.string,
  setBusiness: PropTypes.func,
};

export default AssetsWrapper;
