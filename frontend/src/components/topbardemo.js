import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Link, Element } from "react-scroll";
class Navbar extends React.Component {
  render() {
    return (
      <section id="nav-bar">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="demo"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="process"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    Process
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}
const HomePage = () => (
  <div style={{ backgroundColor: "#6DABF8", height: "1000px" }}>HomePage </div>
);
const DemoPage = () => (
  <div style={{ backgroundColor: "#DFFFEE", height: "1000px" }}>DemoPage </div>
);
const ProcessPage = () => (
  <div style={{ backgroundColor: "#52409F", height: "1000px" }}>
    ProcessPage{" "}
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div style={{ paddingTop: "50px" }}>
          <Element name="home">
            <HomePage />
          </Element>

          <Element name="demo">
            <DemoPage />
          </Element>

          <Element name="process">
            <ProcessPage />
          </Element>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
//https://stackoverflow.com/questions/59506240/sticky-navigation-bar-react
