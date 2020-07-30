import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './our-team.css';

const OurTeamPage = () => {
  return (
    <div id="team">
      <div id="landing-page-display">
        <h1>Meet the Team</h1>
        <p>
          We Love Solving Problems and Helping You Safely Serve Your Customers.
        </p>
      </div>
      <Container style={{marginTop: '30px'}}>
        <Row md={2} sm={1} xs={1}>
          <Col className="single-team-member">
            <div className="image-crop">
              <img src="../images/sam-portrait.jpg" alt="Samuel Berensohn" />
            </div>
            <h2>Samuel Berensohn</h2>
            <div className="link-box">
              <a href="https://github.com/sberen" target="_blank"
                rel="noopener noreferrer">
                <img
                  className='github'
                  src="../images/github.png"
                  alt="GitHub Link"
                />
              </a>
              <a
                href="https://linkedin.com/in/samuel-berensohn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
            </div>
            <div className="member-bio">
              <p>
                Samuel is a rising junior at the University of Washington
                studying Computer Science. As a Freshman, Samuel explored the
                field of CSE, and fell in love with the problem solving and
                critical thinking skills it requires. Outside of academics,
                Samuel is heavily involved with his campus ministry as well as
                local and international volunteer organizations. In the summers,
                Samuel spends the time he isn't developing software leading
                service trips as a Global Service Intern with HOPE worldwide. As
                an aspiring software engineer, Samuel is hoping to combine his
                involvement in volunteer work with his technical background and
                leverage the power of technology to make lives better.
              </p>
            </div>
            <ul>
              <li>Favorite Restaurant: Aji Sushi</li>
              <li>Happy Place: The 15th tee box at Chambers Bay</li>
              <li>Favorite TV Show: The West Wing</li>
            </ul>
          </Col>
          <Col className="single-team-member">
            <div className="image-crop">
              <img src="../images/wes-portrait.jpg" alt="Wesley Lam" />
            </div>
            <h2>Wesley Lam</h2>
            <div className="link-box">
              <a href="https://github.com/wesleyplam" target="_blank" rel="noopener noreferrer">
                <img
                  className='github'
                  src="../images/github.png"
                  alt="GitHub Link"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/wesley-lam-43562a170/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
            </div>
            <div className="member-bio">
              <p>
                Wesley is currently a junior at the University of Washington
                majoring in computer science. Upon entering UW as a College of
                Engineering admit, he was inspired to change his field of study
                after taking the introductory computer science series, and
                decided to pursue a degree in the Allen School of CSE. Outside
                of school, Wesley is invested in giving back to his community,
                leading a tutoring program for Dearborn Elementary students for
                the past two years. As an aspiring professional, Wesley strives
                to become a software engineer, with a particular emphasis on
                redesigning educational platforms to provide an equal
                educational opportunity for students of all backgrounds. As
                hobbies, Wesley enjoys hiking in the great PNW, playing the
                guitar, and hitting the courts for a game of pickup basketball.
              </p>
            </div>
            <ul>
              <li>Favorite Restaurant: Hiroshi's</li>
              <li>Happy Place: Out in Nature/Traveling</li>
              <li>Favorite TV Show: The Office</li>
            </ul>
          </Col>
        </Row>
        <Row md={2} sm={1} xs={1}>
          <Col className="single-team-member">
            <div className="image-crop">
              <img src="../images/grant-portrait.jpg" alt="Grant Williams" />
            </div>
            <h2>Grant Williams</h2>
            <div className="link-box">
              <a href="https://github.com/grantmwilliams38" target="_blank" rel="noopener noreferrer">
                <img
                  className='github'
                  src="../images/github.png"
                  alt="GitHub Link"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/grant-williams-uwcompe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
            </div>
            <div className="member-bio">
              <p>
                Grant can be found studying tech ethics and the global impacts
                of innovation. He is known to dislike Mark Zuckerberg. He
                studies at the University of Washington and aspires to be a
                software engineer. After working in customer service and
                retail, Grant appreciates the power of a positive-minded team.
                A soccer fanatic, he is a leader of the UW Club Soccer
                program and enjoys watching the English Premier League,
                supporting Manchester United.
              </p>
            </div>
            <ul>
              <li>Favorite Restaurant: Thaiger Room</li>
              <li>Happy Place: The midfield</li>
              <li>Favorite TV Show: Elementary</li>
            </ul>
          </Col>
          <Col className="single-team-member">
            <div className="image-crop">
              <img src="../images/ziz-portrait.jpg" alt="Zizhen Song" />
            </div>
            <h2>Zizhen Song</h2>
            <div className="link-box">
              <a href="https://github.com/songziz" target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className='github'
                  src="../images/github.png"
                  alt="GitHub Link"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/zizhen-song/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
            </div>
            <div className="member-bio">
              <p>Zizhen loves building software. Working with University of
                Washington Transportation Services, he has led the deployment
                of campus parking management software to keep track of
                university resources and aid with event planning. He has also
                researched cellular image processing methodologies as an
                assistant at the Cell Biomechanics Lab. Zizhen is passionate
                about exploring disruptive technologies and is hoping to
                reimagine waitrooms with radius. </p>
            </div>
            <ul>
              <li>Favorite Restaurant: Kong Tofu House</li>
              <li>Happy Place: Engineering Library</li>
              <li>Favorite TV Show: Suits</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OurTeamPage;
