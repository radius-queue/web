import React, { useEffect, useState } from 'react';
import './landing-page.css';

/**
 * the landing page for our website.
 *
 * @return {jsx} the HTML to be displayed for this component.
 */

const DefaultLandingPage = () => {
  const [redHover, setRedHover] = useState(false);
  const [greenHover, setGreenHover] = useState(false);
  const [blueHover, setBlueHover] = useState(false);

  useEffect(() => {
    const [redOn, redOff, redRadius] = callRedRadius();
    const [greenOn, greenOff, greenRadius] = callGreenRadius();
    const [blueOn, blueOff, blueRadius] = callBlueRadius();
    return () => {
      (redRadius as HTMLElement).removeEventListener('mouseenter', redOn);
      (blueRadius as HTMLElement).removeEventListener('mouseenter', blueOn);
      (greenRadius as HTMLElement).removeEventListener('mouseenter', greenOn);
      (greenRadius as HTMLElement).removeEventListener('mouseleave', greenOff);
      (redRadius as HTMLElement).removeEventListener('mouseleave', redOff);
      (blueRadius as HTMLElement).removeEventListener('mouseleave', blueOff);
    };
  }, [redHover, greenHover, blueHover]);

  const callRedRadius = (): [(e: any) => void, (e: any) => void, HTMLElement] => {
    const redRadius = document.getElementById('red-radii-outline');
    const handler1 = (e: any) => {
      setRedHover(!redHover);
    };
    redRadius?.addEventListener('mouseenter', handler1);
    const handler2 = (e: any) => {
      setRedHover(!redHover);
    };
    redRadius?.addEventListener('mouseleave', handler2);
    return [handler1, handler2, redRadius!];
  };

  const callGreenRadius = (): [(e: any) => void, (e: any) => void, HTMLElement] => {
    const greenRadius = document.getElementById('green-radii-outline');
    const handler1 = (e: any) => {
      setGreenHover(!greenHover);
    };
    greenRadius?.addEventListener('mouseenter', handler1);
    const handler2 = (e: any) => {
      setGreenHover(!greenHover);
    };
    greenRadius?.addEventListener('mouseleave', handler2);
    return [handler1, handler2, greenRadius!];
  };

  const callBlueRadius = (): [(e: any) => void, (e: any) => void, HTMLElement] => {
    const blueRadius = document.getElementById('blue-radii-outline');
    const handler1 = (e: any) => {
      setBlueHover(!blueHover);
    };
    blueRadius?.addEventListener('mouseenter', handler1);
    const handler2 = (e: any) => {
      setBlueHover(!blueHover);
    };
    blueRadius?.addEventListener('mouseleave', handler2);
    return [handler1, handler2, blueRadius!];
  };

  let redString: string;
  if (redHover) {
    redString = 'red-radius-container-lit';
  } else if (greenHover || blueHover) {
    redString = 'red-radius-container-dim';
  } else {
    redString = 'red-radius-container';
  }

  let greenString: string;
  if (greenHover) {
    greenString = 'green-radius-container-lit';
  } else if (redHover || blueHover) {
    greenString = 'green-radius-container-dim';
  } else {
    greenString = 'green-radius-container';
  }

  let blueString: string;
  if (blueHover) {
    blueString = 'blue-radius-container-lit';
  } else if (redHover || greenHover) {
    blueString = 'blue-radius-container-dim';
  } else {
    blueString = 'blue-radius-container';
  }

  {
    return (
      <div id="landing-page-display">
        <div>
          <div id={(redHover || greenHover || blueHover) ? 'background-image-dim' : 'background-image'}>
            <img
              className="hero-image"
              src="../../images/storefront-only.png"
              alt="Businesses with Radii"
            />
          </div>
          <div className={(redHover || greenHover || blueHover) ? 'hero-text-dim' : ''} >
            <h1 className="hero-text-title">Radius for Business</h1>
            <p className="hero-text-subtitle">The waiting room reimagined.</p>
          </div>
          <div className={redString}>
            <img
              id="red-radii-outline"
              src="../../images/red-radius.png"
              alt="Red Radii outline"
            />
          </div>
          <div className={redHover ? 'red-text-on' : 'red-text-off'} >
            <h1>Title 1</h1>
            <p>Description goes here...</p>
          </div>
          <div className={greenString}>
            <img
              id="green-radii-outline"
              src="../../images/green-radius.png"
              alt="Green Radii outline"
            />
          </div>
          <div className={greenHover ? 'green-text-on' : 'green-text-off'} >
            <h1>Title 2</h1>
            <p>Description goes here...</p>
          </div>
          <div className={blueString}>
            <img
              id="blue-radii-outline"
              src="../../images/blue-radius.png"
              alt="Blue Radii outline"
            />
          </div>
          <div className={blueHover ? 'blue-text-on' : 'blue-text-off'} >
            <h1>Title 3</h1>
            <p>Description goes here...</p>
          </div>
        </div>
      </div>
    );
  };
};

export default DefaultLandingPage;
