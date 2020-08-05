import React, {useState, useEffect} from 'react';
import AssetsPage from './assets';
import PropTypes from 'prop-types';
import {Business} from '../../util/business';

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

  useEffect(() => {
    if (business !== null) {
      setBusinessLoading(false);
    }
  }, [business]);

  return (isBusinessLoading) ?
    <AssetsLoadingPage/> :
    <AssetsPage uid={uid} setBusiness={setBusiness} business={business}/>;
};

AssetsWrapper.propTypes = {
  business: PropTypes.object,
  uid: PropTypes.string,
  setBusiness: PropTypes.func,
};

export default AssetsWrapper;
