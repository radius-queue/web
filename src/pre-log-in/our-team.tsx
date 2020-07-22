import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OurTeamPage = () => {
  return (
    <div>
      <div id="landing-page-display">
        <h1>Meet the Team</h1>
        <p>
          We Love Solving Problems and Helping You Safely Serve Your Customers.
        </p>
      </div>
      <Container style={{ marginTop: "30px" }}>
        <Row md={2} sm={1} xs={1}>
          <Col className="single-team-member">
            <div className="image-crop">
              <img src="../images/sam-portrait.jpg" alt="Samuel Berensohn" />
            </div>
            <h2>Samuel Berensohn</h2>
            <div className="link-box">
              <a href="https://github.com/sberen" target="_blank">
                <img src="../images/github.png" alt="GitHub Link" />
              </a>
              <a
                href="https://linkedin.com/in/samuel-berensohn/"
                target="_blank"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
              <a href="https://www.facebook.com/sam.berensohn" target="_blank">
                <img src="../images/facebook.png" alt="Facebook Link" />
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
            <p>
              Favourite Restaurant: Aji Sushi <br/>
              Happy Place: The 15th tee box at Chambers Bay <br/>
              Favourite TV Show: The West Wing</p>
          </Col>
          <Col>
            <div className="image-crop">
              <img src="../images/grant-portrait.jpg" alt="Grant Williams" />
            </div>
            <h2>Grant Williams</h2>
            <div className="link-box">
              <a href="https://github.com/grantmwilliams38" target="_blank">
                <img src="../images/github.png" alt="GitHub Link" />
              </a>
              <a
                href="https://www.linkedin.com/in/grant-williams-uwcompe/"
                target="_blank"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
              <a
                href="https://www.facebook.com/grant.williams.397"
                target="_blank"
              >
                <img src="../images/facebook.png" alt="Facebook Link" />
              </a>
            </div>
            <div className="member-bio">
              <p>
                Grant is an aspiring software engineer studying at the
                University of Washington. Among other things, he’s known for his
                hatred towards Mark Zuckerberg. A soccer fanatic, he’s a staple
                of the UW Club Soccer team and enjoys watching the English
                Premier League. He supports Manchester United and his favorite
                player is Paul Pogba.
              </p>
            </div>
            <p>
              Favorite Restaurant: Thaiger Room<br/>
              Happy Place: The Midfield<br/>
              Favorite TV Show: Elementary
            </p>
          </Col>
        </Row>
        <Row md={2} sm={1} xs={1}>
          <Col className="single-team-member">
            <div className="image-crop">
              <img src="../images/wes-portrait.jpg" alt="Wesley Lam" />
            </div>
            <h2>Wesley Lam</h2>
            <div className="link-box">
              <a href="https://github.com/wesleyplam" target="_blank">
                <img src="../images/github.png" alt="GitHub Link" />
              </a>
              <a
                href="https://www.linkedin.com/in/wesley-lam-43562a170/"
                target="_blank"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
              <a href="https://www.facebook.com/wesley.lam.903" target="_blank">
                <img src="../images/facebook.png" alt="Facebook Link" />
              </a>
            </div>
            <div className="member-bio">
              <p>
                Wesley is currently a junior at the University of Washington
                majoring in computer science. Upon entering UW as a college of
                engineering admit, he was inspired to change his field of study
                after taking the introductory computer science series, and
                decided to pursue a degree in the Allen school of CSE. Outside
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
            <p>
              Favorite Restaurant: Hiroshi's<br/>
              Happy Place: Out in Nature/Traveling<br/>
              Favorite TV Show: The Office
            </p>
          </Col>
          <Col>
            <div className="image-crop">
              <img src="../images/zizhen-portrait.jpg" alt="Zizhen Song" />
            </div>
            <h2>Zizhen Song</h2>
            <div className="link-box">
              <a href="https://github.com/songziz" target="_blank">
                <img src="../images/github.png" alt="GitHub Link" />
              </a>
              <a
                href="https://www.linkedin.com/in/zizhen-song/"
                target="_blank"
              >
                <img
                  src="../images/linked-in.png"
                  alt="LinkedIn Link"
                  id="linked-in"
                />
              </a>
              <a href="https://www.facebook.com/kevin.song.336" target="_blank">
                <img src="../images/facebook.png" alt="Facebook Link" />
              </a>
            </div>
            <div className="member-bio">
              <p>Ziz's Bio Here.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OurTeamPage;
