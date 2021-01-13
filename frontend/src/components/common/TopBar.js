import { Component } from 'react';
import { Link } from 'react-scroll';
import './TopBar.css';

class TopBar extends Component {
  render() {
    return (
      <div className="container-fluid sticky">
        <div style={{ display: 'inline' }}>
          <img
            src="/xnia.png"
            style={{ paddingLeft: '10px', height: '30px' }}
            alt=""
          />
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <div className="menuItem">
            <Link
              activeClass="active"
              to="ProductionCombined"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [New production]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="BloodCombined"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [New blood]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="PrescriptionCombined"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [New prescription]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="Doctors"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Doctors]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="Clinics"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Clinics]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="Lysates"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Lysates]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="Products"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Producs]
            </Link>
          </div>
          <div className="menuItem">
            <Link
              activeClass="active"
              to="Persons"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Persons]
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
