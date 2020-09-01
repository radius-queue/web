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
  const [isAnimating, setisAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisAnimating(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
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
    }
  }, [redHover, greenHover, blueHover, isAnimating]);

  const callRedRadius = (): [(e: any) => void, (e: any) => void, HTMLElement] => {
    const redRadius = document.getElementById('red-radii-outline');
    const handler1 = (e: any) => {
      setRedHover(true);
    };
    redRadius?.addEventListener('mouseenter', handler1);
    const handler2 = (e: any) => {
      setRedHover(false);
    };
    redRadius?.addEventListener('mouseleave', handler2);
    return [handler1, handler2, redRadius!];
  };

  const callGreenRadius = (): [(e: any) => void, (e: any) => void, HTMLElement] => {
    const greenRadius = document.getElementById('green-radii-outline');
    const handler1 = (e: any) => {
      setGreenHover(true);
    };
    greenRadius?.addEventListener('mouseenter', handler1);
    const handler2 = (e: any) => {
      setGreenHover(false);
    };
    greenRadius?.addEventListener('mouseleave', handler2);
    return [handler1, handler2, greenRadius!];
  };

  const callBlueRadius = (): [(e: any) => void, (e: any) => void, HTMLElement] => {
    const blueRadius = document.getElementById('blue-radii-outline');
    const handler1 = (e: any) => {
      setBlueHover(true);
    };
    blueRadius?.addEventListener('mouseenter', handler1);
    const handler2 = (e: any) => {
      setBlueHover(false);
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
        <div className="d-block d-lg-none" id="small-container">
          <img src="../../images/radius-logo.png" id="landing-logo" alt="Radius logo" />
          <p>The waiting room reimagined.</p>
          <img src="../../images/storefront-only.png" id="landing-storefronts" alt="Storefronts" />
        </div>
        <div className="d-none d-lg-block">
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
            <h1>Intuitive and practical</h1>
            <p>Welcome to the future of the waiting room. With Radius, businesses like yours can create and <br></br>manage a virtual waiting room for free.
              With a sleek queue design that allows you to add, remove, <br></br>and rearrange parties, managing a waiting room has never been more simple and efficient.
            <br></br>Our additional messaging feature allows you to contact parties with notifications of their wait time and <br></br>even personalized messages on Radius' complementary
              customer-side mobile app.</p>
          </div>
          <div className={greenString}>
            <img
              id="green-radii-outline"
              src="../../images/green-radius.png"
              alt="Green Radii outline"
            />
          </div>
          <div className={greenHover ? 'green-text-on' : 'green-text-off'} >
            <h1>Tailored to your business</h1>
            <p>Radius allows you to fully customize your profile and queue preferences.<br></br>
              Our flagship feature allows you to set a distance from which customers can check-in <br></br>to the waiting room to ensure they are within a reasonable distance.
              Furthermore, all business <br></br>info will be displayed on the Radius mobile app for customers to see, a great marketing opportunity!. </p>
          </div>
          <div className={blueString}>
            <img
              id="blue-radii-outline"
              src="../../images/blue-radius.png"
              alt="Blue Radii outline"
            />
          </div>
          <div className={blueHover ? 'blue-text-on' : 'blue-text-off'} >
            <h1>A timely solution</h1>
            <p>In light of the coronavirus pandemic, many walk-in businesses face <br></br>the issue of social distancing their customers in confined waiting spaces. <br></br>
              Radius eliminates this concern by allowing customers to virtually check-in to <br></br>a waiting room, prioritizing customer health and safety, and making
              it easier to <br></br>adhere to social distancing guidelines.</p>
          </div>
        </div>
      </div>
    );
  };
};

export default DefaultLandingPage;
