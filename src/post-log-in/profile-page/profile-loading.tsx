import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './profile.css';

/**
 * The profile page display when the page is loading.
 * @return {jsx} The loading profile display.
 */
const LoadingProfile = () => {
  return (
    <div>
      <Card id='profile-container'>
        <Card.Body id='body-container'>
          <Card.Title>
            <Skeleton count={1} width={450} height={30}/>
          </Card.Title>
          <Form>
            <Skeleton
              style={{marginTop: '10%'}}
              count={1}
              width={450}
              height={30}
            />
            {[1, 2].map((val) => (<div key={val} style={{marginTop: '10%'}}>
              <Skeleton width={220} height={30}/>
              <Skeleton width={220} height={30} style={{marginLeft: '10px'}}/>
            </div>))}
            {[1, 2, 3].map((val) =>
              <Skeleton
                style={{marginTop: '10%'}}
                key={val+2}
                count={1}
                width={450}
                height={30}
              />,
            )}
          </Form>
        </Card.Body>
      </Card>
      <Card id='map-container'>
        <Card.Body>
          <Skeleton height={550}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoadingProfile;
