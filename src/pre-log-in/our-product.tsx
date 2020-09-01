import React from 'react';
import Container from 'react-bootstrap/Container';
import './our-product.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const OurProductPage = () => {
  return (
    <Container fluid id="page">
      <Container id="landing-page-display">
        <h1>Our Product</h1>
        <p id="description">
          This tutorial will give you the full Radius experience.
          First, watch the Radius intro video to get a feel for
          our product. Then,
          we will explain how to set up your very own business
          on the web app and then how to get in your line using
          the Radius mobile app! Feel free to use a dummy business
          of your own creation for the tutorial.
        </p>
      </Container>
      <Container>
        <Row id="tutorial">
          <Row className="span-width">
            <Col xs={2}>
              <h3 className="subheader">Watch the Radius Intro Video</h3>
            </Col>
            <Col>
              <ListGroup className="list-group">
                <ListGroup.Item>
                  <Row>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/WaKoYsUl0IY" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="span-width">
            <Col xs={2}>
              <h3 className="subheader">Set Up Your Virtual Waiting Room</h3>
            </Col>
            <Col>
              <ListGroup className="list-group">
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        1.
                      </Col>
                      <Col>
                        Go to the <Link to="/register">Register</Link> tab
                        at the top of this webpage
                        and fill out the form. You will be sent an email
                        with a link to verify your email address. Once
                        you've verified your email, head over to
                        the <Link to="/log-in">Log In</Link> tab
                        and log in! Make sure you're on a desktop computer for the best results.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        2.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/navigate-profile.png"
                            alt="Navigation bar with Profile tab highlighted"
                            className="nav-img"
                          />
                        </Row>
                        Welcome to your business hub! Note that the navigation
                        bar at the top of the screen displays the three tabs
                        within the hub - Profile, Queue, and Assets.
                        Before you can use a
                        Radius virtual waiting room, you must enter your
                        business information on the Profile tab.
                        Once you set your business
                        address, you will have the option to set your check-in
                        radius on the map to the right of the form.
                        Complete the
                        Business Profile form and click the submit button.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        3.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/navigate-assets.png"
                            alt="Navigation bar with Assets tab highlighted"
                            className="nav-img"
                          />
                        </Row>
                        Now that you've submitted your business profile, let's
                        check out the Assets tab. Here, you can upload an image
                        that will represent your business for customers on
                        the mobile app. Post images until you are satisfied with
                        the Feed View preview shown on the page!
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        4.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/navigate-queue.png"
                            alt="Navigation bar with Queue tab highlighted"
                            className="nav-img"
                          />
                        </Row>
                        Finally, head over to the Queue tab. This is the
                        dashboard for the day-to-day operation of your
                        virtual waiting room.
                        <Row>
                          <img src="../images/example-queue.png"
                            alt="Example queue"
                            className="example-img"
                          />
                        </Row>
                        At the left of the screen, you can see the people
                        currently in your line. Since you've just created your
                        business, your line will be empty. Try using the
                        "Add a Party" button to manually add some customers.
                        Usually, customers will be getting in line themselves
                        by checking in on the mobile app. When you have
                        customers in line, you can use the three action buttons
                        to reorder and remove customers.
                        <Row>
                          <img src="../images/example-controls.png"
                            alt="Example controls"
                            className="example-img"
                          />
                        </Row>
                        At the top right of your screen, you can see your
                        waiting room controls. You can open and close your
                        queue to customers on the mobile app. This is helpful
                        for opening and closing at the end of the work day.
                        You can also clear the queue to easily remove all
                        customers from line. Plus, you can use the message box
                        to send a message to all customers in line.
                        <Row>
                          <img src="../images/example-customer.png"
                            alt="Example customer"
                            className="example-img"
                          />
                        </Row>
                        At the bottom right of your screen, you can see a
                        customer profile. Click on a customer in the queue
                        to see that customer's information. Notification
                        buttons are handy for making sure customers know
                        when their turn is coming up. Custom messaging is
                        also available.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        5.
                      </Col>
                      <Col>
                        Now that you're familiar with the hub, let's explore
                        the Radius mobile app! Keep your hub page open to the
                        Queue tab. Later, when you get in line for your business
                        through the mobile app, you will see your name pop up in
                        the queue in real time!
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="span-width">
            <Col xs={2}>
              <h3 className="subheader">Explore the Radius Mobile App</h3>
            </Col>
            <Col>
              <ListGroup className="list-group">
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        1.
                      </Col>
                      <Col>
                        If you have an Android mobile device with the Expo app installed, go to the following link
                        to use our Radius mobile app: <a target="_blank" rel="noreferrer" href="https://expo.io/@songziz/radius-mobile">https://expo.io/@songziz/radius-mobile</a>.
                        If you do not have an Android mobile device,
                        we will use an emulator provided by Expo to view
                        the Radius mobile app. We ask that you be patient
                        with the emulator, as it is sometimes slow to
                        load content and respond to user input. <a target="_blank" rel="noreferrer" href="https://expo.io/appetize-simulator?url=https://expo.io/@songziz/radius-mobile">Click here for the emulator.</a>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        2.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator.png"
                            alt="Example emulator"
                            className="emulator-img"
                          />
                        </Row>
                        If you are using an emulator, you will see this screen appear. Click "Tap to Play" to
                        enter the emulator.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        3.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-waiting.png"
                            alt="Example emulator waiting to play"
                            className="emulator-img"
                          />
                        </Row>
                        When using an emulator, you may have to wait in a queue to access the Expo
                        emulator.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        4.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-open.png"
                            alt="Example emulator with open button"
                            className="emulator-img"
                          />
                        </Row>
                        Once on the Expo project page, scroll down. You will
                        see a purple button saying "Open project using Expo."
                        Clicking that button will open the Radius mobile app!
                        If you have an Android device with the Expo app
                        installed, you have the option of scanning the QR
                        code displayed on this page to run the app on your
                        device. You may also skip to step 8 of the tutorial if you are running the app on an Android device.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        5.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-alert.png"
                            alt="Example emulator with alert"
                            className="emulator-img"
                          />
                        </Row>
                        If using the online emulator, an alert will display
                        saying that you "must use physical device for Push
                        Notifications." Our app's push notifications will
                        be disabled for the tutorial because of this.
                        Click "OK" to continue.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        6.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-welcome.png"
                            alt="Example emulator with welcome message"
                            className="emulator-img"
                          />
                        </Row>
                        You will be brought to this screen explaining
                        how to use the Expo emulator.
                        Click "Got it" button to continue.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        7.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-home.png"
                            alt="Example emulator home"
                            className="emulator-img"
                          />
                        </Row>
                        This Expo controls screen will then be displayed.
                        Click the "x" to clear the controls and view the
                        app itself!
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        8.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-explore.png"
                            alt="Example emulator explore page"
                            className="emulator-img"
                          />
                        </Row>
                        You will now see the Radius mobile app! Notice that
                        there are two tabs at the bottom of the app. The
                        default tab is the "Feed" tab. Here you can
                        explore all the businesses with Radius virtual
                        waiting rooms. As you favorite businesses and
                        join lines, favorites and recents will be displayed
                        here as well.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        9.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-business.png"
                            alt="Example emulator business page"
                            className="emulator-img"
                          />
                        </Row>
                        Feel free to find the business you created! If you
                        didn't create your own business, check out the fake
                        "Tight Cuts" business, which lets customers
                        check in from anywhere along the
                        U.S. west coast. From this page, you can see
                        business info,
                        the business' check-in radius, and some basic
                        info about their current queue.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        10.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-join.png"
                            alt="Example emulator join business page"
                            className="emulator-img"
                          />
                        </Row>
                        Click the "Join Queue" button and input some
                        info to get in line! You will only be added to
                        the line if you are inside the business' radius.
                        When asked, allow Expo
                        to access the device's location to check if you
                        are inside the radius. Note: Because your location
                        will be assessed as the location of the Expo server,
                        you may need to return to the web app and expand your
                        business' radius significantly to ensure the emulator is
                        within the check-in area.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        11.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-queue.png"
                            alt="Example emulator queue page"
                            className="emulator-img"
                          />
                        </Row>
                        You will be brought to the "Queue" tab. Here, you
                        can see your spot in line and messages from the
                        business.
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        12.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/example-emulator-fav.png"
                            alt="Example emulator feed page with favorites"
                            className="emulator-img"
                          />
                        </Row>
                        Continue exploring the app! If you are in line at
                        your own business you created, feel free to
                        edit your queue and send messages from the web app
                        and see the changes pop up in real time on the
                        mobile app emulator!
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col xs={1} className="step-number">
                        13.
                      </Col>
                      <Col>
                        <Row>
                          <img src="../images/radius-logo.png"
                            alt="Radius logo"
                            className="emulator-img"
                          />
                        </Row>
                        Thank you for completing the tutorial! If you have
                        feedback for us, please reach out to grantmw@uw.edu!
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
};

export default OurProductPage;
